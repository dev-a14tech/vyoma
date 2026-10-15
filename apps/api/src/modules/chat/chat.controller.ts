import { Body, Controller, Get, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service.js';
import { ChatReply, ChatRequestDto } from './dto/chat.dto.js';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  // Lets the widget hide itself when no Gemini key is set.
  @Get('status')
  status() {
    return { enabled: this.chat.isConfigured() };
  }

  @Throttle({ default: { limit: 12, ttl: 60_000 } })
  @Post()
  reply(@Body() dto: ChatRequestDto): Promise<ChatReply> {
    return this.chat.reply(dto.messages);
  }
}
