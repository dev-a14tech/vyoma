import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PageContentDocument = HydratedDocument<PageContent>;

@Schema({ timestamps: true })
export class PageContent {
  @Prop({ type: String, required: true, unique: true })
  slug!: string;

  @Prop({ type: String, required: true })
  heroTitle!: string;

  @Prop({ type: String, required: true })
  heroSubtitle!: string;

  @Prop({ type: String, required: true })
  seoTitle!: string;

  @Prop({ type: String, required: true })
  seoDescription!: string;

  @Prop({ type: String, default: null })
  ogImageUrl!: string | null;

  @Prop({ type: [{ type: Object }], default: [] })
  blocks!: Array<{ type: string; data: Record<string, unknown> }>;
}

export const PageContentSchema = SchemaFactory.createForClass(PageContent);
