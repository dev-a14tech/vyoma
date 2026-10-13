import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AudienceSegmentDocument = HydratedDocument<AudienceSegment>;

@Schema({ timestamps: true })
export class AudienceSegment {
  @Prop({ type: String, required: true, unique: true })
  slug!: string;

  @Prop({ type: Number, default: 0 })
  order!: number;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  heroCopy!: string;

  @Prop({ type: [String], default: [] })
  painPoints!: string[];

  @Prop({ type: [String], default: [] })
  relevantFeatureSlugs!: string[];

  @Prop({ type: Boolean, default: true })
  published!: boolean;
}

export const AudienceSegmentSchema = SchemaFactory.createForClass(AudienceSegment);
