import { IsArray, IsBoolean, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpsertAudienceDto {
  @IsString()
  @MinLength(2)
  slug!: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsString()
  @MinLength(2)
  title!: string;

  @IsString()
  @MinLength(2)
  heroCopy!: string;

  @IsArray()
  painPoints!: string[];

  @IsArray()
  relevantFeatureSlugs!: string[];

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
