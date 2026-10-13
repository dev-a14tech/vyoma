import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

const PLACEHOLDER_MOTIFS = ['yantra-grid', 'orbit-bands', 'flight-chevron', 'rosette-ring'] as const;

export class UpsertFeatureDto {
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
  summary!: string;

  @IsString()
  icon!: string;

  @IsString()
  bodyMarkdown!: string;

  @IsString()
  @IsOptional()
  videoUrl?: string | null;

  @IsIn(PLACEHOLDER_MOTIFS)
  placeholderMotif!: (typeof PLACEHOLDER_MOTIFS)[number];

  @IsArray()
  capabilities!: string[];

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
