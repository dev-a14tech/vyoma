import { IsIn, IsInt, IsString, Max, MinLength } from 'class-validator';

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'] as const;
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export class PresignUploadDto {
  @IsString()
  @MinLength(1)
  filename!: string;

  @IsIn(ALLOWED_MIME_TYPES)
  contentType!: (typeof ALLOWED_MIME_TYPES)[number];

  @IsInt()
  @Max(MAX_UPLOAD_BYTES)
  sizeBytes!: number;
}
