import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeadSubmission, LeadSubmissionDocument } from '../../database/schemas/lead-submission.schema.js';
import { CreateLeadDto, UpdateLeadStatusDto } from './dto/create-lead.dto.js';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(LeadSubmission.name) private readonly model: Model<LeadSubmissionDocument>) {}

  create(type: 'DEMO_REQUEST' | 'CONTACT', dto: CreateLeadDto) {
    return this.model.create({
      type,
      name: dto.name,
      email: dto.email,
      company: dto.company,
      role: dto.role,
      message: dto.message,
      source: dto.source ?? 'website'
    });
  }

  findAll() {
    return this.model.find().sort({ createdAt: -1 });
  }

  updateStatus(id: string, dto: UpdateLeadStatusDto) {
    return this.model.findByIdAndUpdate(id, { status: dto.status }, { new: true });
  }
}
