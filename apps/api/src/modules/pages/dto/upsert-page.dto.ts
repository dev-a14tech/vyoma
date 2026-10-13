import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class UpsertPageDto {
  @IsString()
  @MinLength(2)
  heroTitle!: string;

  @IsString()
  heroSubtitle!: string;

  @IsString()
  seoTitle!: string;

  @IsString()
  seoDescription!: string;

  @IsString()
  @IsOptional()
  ogImageUrl?: string | null;

  @IsArray()
  @IsOptional()
  blocks?: Array<{ type: string; data: Record<string, unknown> }>;
}
