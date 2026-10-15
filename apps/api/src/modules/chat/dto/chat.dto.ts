import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';

export class ChatMessageDto {
  @IsIn(['user', 'assistant'])
  role!: 'user' | 'assistant';

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  content!: string;
}

export class ChatRequestDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages!: ChatMessageDto[];
}

export interface ChatReply {
  reply: string;
}
