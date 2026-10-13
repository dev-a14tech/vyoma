import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeatureThemeDocument = HydratedDocument<FeatureTheme>;

export const PLACEHOLDER_MOTIFS = ['yantra-grid', 'orbit-bands', 'flight-chevron', 'rosette-ring'] as const;

@Schema({ timestamps: true })
export class FeatureTheme {
  @Prop({ type: String, required: true, unique: true })
  slug!: string;

  @Prop({ type: Number, default: 0 })
  order!: number;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  summary!: string;

  @Prop({ type: String, required: true })
  icon!: string;

  @Prop({ type: String, required: true })
  bodyMarkdown!: string;

  @Prop({ type: String, default: null })
  videoUrl!: string | null;

  @Prop({ type: String, required: true, enum: PLACEHOLDER_MOTIFS })
  placeholderMotif!: (typeof PLACEHOLDER_MOTIFS)[number];

  @Prop({ type: [String], default: [] })
  capabilities!: string[];

  @Prop({ type: Boolean, default: true })
  published!: boolean;
}

export const FeatureThemeSchema = SchemaFactory.createForClass(FeatureTheme);
