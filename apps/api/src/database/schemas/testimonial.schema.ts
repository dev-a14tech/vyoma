import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema({ timestamps: true })
export class Testimonial {
  @Prop({ type: String, required: true })
  quote!: string;

  @Prop({ type: String, required: true })
  authorName!: string;

  @Prop({ type: String, required: true })
  authorRole!: string;

  @Prop({ type: String, required: true })
  orgName!: string;

  @Prop({ type: String, default: null })
  logoUrl!: string | null;

  @Prop({ type: Boolean, default: true })
  published!: boolean;

  @Prop({ type: Number, default: 0 })
  order!: number;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
