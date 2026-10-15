import { BadGatewayException, Injectable, Logger, ServiceUnavailableException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CHAT_SYSTEM_PROMPT } from './chat-knowledge.js';
import { ChatMessageDto, ChatReply } from './dto/chat.dto.js';

// Only the most recent turns go to the model: keeps cost and latency down, and a long
// conversation cannot be used to push the assistant off its instructions.
const MAX_TURNS = 10;

// Tried in order after GEMINI_MODEL.
const FALLBACK_MODELS = ['gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-3.8-flash'];

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

    const primary = this.config.get<string>('GEMINI_MODEL', 'gemini-flash-latest');
    const base = this.config.get<string>('GEMINI_API_BASE', 'https://generativelanguage.googleapis.com').replace(/\/+$/, '');

    const contents = messages.slice(-MAX_TURNS).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    const body = JSON.stringify({
      systemInstruction: { parts: [{ text: CHAT_SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.3, maxOutputTokens: 700 }
    });

    // Quota, availability and model access differ per model on a Gemini key, so a
    // 404/429/5xx on one model falls through to the next instead of failing the visitor.
    const models = [primary, ...FALLBACK_MODELS.filter(m => m !== primary)];
    let res: Response | undefined;
    for (const model of models) {
      try {
        res = await fetch(`${base}/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
          body,
          signal: AbortSignal.timeout(15_000)
        });
      } catch (err) {
        this.logger.error(`Gemini request to ${model} failed: ${(err as Error).message}`);
        res = undefined;
        continue;
      }
      if (res.ok) break;
      // The body can echo request details, so it stays in the server log only.
      this.logger.error(`Gemini ${model} returned ${res.status}: ${(await res.text()).slice(0, 500)}`);
      // 400/401/403 mean the key or request is wrong: another model will not help.
      if (res.status === 400 || res.status === 401 || res.status === 403) break;
    }

    if (!res || !res.ok) {
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
