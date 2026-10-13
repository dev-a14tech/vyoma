import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Admin {
  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true })
  passwordHash!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: Date })
  lastLoginAt?: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
