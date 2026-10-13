import { IsBoolean, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpsertTestimonialDto {
  @IsString()
  @MinLength(5)
  quote!: string;

  @IsString()
  authorName!: string;

  @IsString()
  authorRole!: string;

  @IsString()
  orgName!: string;

  @IsString()
  @IsOptional()
  logoUrl?: string | null;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
