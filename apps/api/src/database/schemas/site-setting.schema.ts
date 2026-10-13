import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SiteSettingDocument = HydratedDocument<SiteSetting>;

@Schema({ _id: false })
export class SiteSetting {
  @Prop({ type: String, required: true, unique: true })
  key!: string;

  @Prop({ type: Object })
  value!: unknown;
}

export const SiteSettingSchema = SchemaFactory.createForClass(SiteSetting);
