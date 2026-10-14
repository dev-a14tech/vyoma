import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeadSubmissionDocument = HydratedDocument<LeadSubmission>;

export const LEAD_TYPES = ['DEMO_REQUEST', 'CONTACT'] as const;
export const LEAD_STATUSES = ['NEW', 'CONTACTED', 'CLOSED'] as const;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class LeadSubmission {
  @Prop({ type: String, required: true, enum: LEAD_TYPES })
  type!: (typeof LEAD_TYPES)[number];

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  email!: string;

  @Prop({ type: String })
  company?: string;

  @Prop({ type: String })
  role?: string;

  @Prop({ type: String })
  orgType?: string;

  @Prop({ type: String })
  timing?: string;

  @Prop({ type: String })
  topic?: string;

  @Prop({ type: String })
  message?: string;

  @Prop({ type: String, default: 'website' })
  source!: string;

  @Prop({ type: String, required: true, enum: LEAD_STATUSES, default: 'NEW' })
  status!: (typeof LEAD_STATUSES)[number];
}

export const LeadSubmissionSchema = SchemaFactory.createForClass(LeadSubmission);
