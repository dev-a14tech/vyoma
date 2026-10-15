import { BadGatewayException, Injectable, Logger, ServiceUnavailableException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CHAT_SYSTEM_PROMPT } from './chat-knowledge.js';
import { ChatMessageDto, ChatReply } from './dto/chat.dto.js';

// Only the most recent turns go to the model: keeps cost and latency down, and a long
// conversation cannot be used to push the assistant off its instructions.
const MAX_TURNS = 10;

interface GeminiResponse {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  promptFeedback?: { blockReason?: string };
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(@Inject(ConfigService) private readonly config: ConfigService) {}

  isConfigured(): boolean {
    return !!this.config.get<string>('GEMINI_API_KEY');
  }

  async reply(messages: ChatMessageDto[]): Promise<ChatReply> {
    const apiKey = this.config.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new ServiceUnavailableException('The assistant is not available right now.');
    }
    const last = messages[messages.length - 1];
    if (!last || last.role !== 'user') {
      throw new BadGatewayException('The last message must be from the visitor.');
    }

    const model = this.config.get<string>('GEMINI_MODEL', 'gemini-2.5-flash');
    const base = this.config.get<string>('GEMINI_API_BASE', 'https://generativelanguage.googleapis.com').replace(/\/+$/, '');

    const contents = messages.slice(-MAX_TURNS).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    let res: Response;
    try {
      res = await fetch(`${base}/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: CHAT_SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.3, maxOutputTokens: 700 }
        }),
        signal: AbortSignal.timeout(20_000)
      });
    } catch (err) {
      this.logger.error(`Gemini request failed: ${(err as Error).message}`);
      throw new BadGatewayException('The assistant could not be reached. Please try again.');
    }

    if (!res.ok) {
      // The body can echo request details, so it stays in the server log only.
      this.logger.error(`Gemini returned ${res.status}: ${(await res.text()).slice(0, 500)}`);
      throw new BadGatewayException('The assistant could not answer right now. Please try again.');
    }

    const data = (await res.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.map(p => p.text ?? '').join('').trim();
    if (!text) {
      this.logger.warn(`Gemini returned no text (blockReason: ${data.promptFeedback?.blockReason ?? 'none'})`);
      return { reply: "I can't help with that one. Ask me about VYOMA's modules, or book a demo and the team will answer directly." };
    }
    return { reply: text };
  }
}
