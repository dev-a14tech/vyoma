import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeadSubmission, LeadSubmissionDocument } from '../../database/schemas/lead-submission.schema.js';
import { CreateLeadDto, UpdateLeadStatusDto } from './dto/create-lead.dto.js';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(LeadSubmission.name) private readonly model: Model<LeadSubmissionDocument>) {}

  private readonly logger = new Logger(LeadsService.name);

  async create(type: 'DEMO_REQUEST' | 'CONTACT', dto: CreateLeadDto) {
    try {
      return await this.save(type, dto);
    } catch (err) {
      // Usually MongoDB is unreachable (check MONGODB_URI and Atlas Network Access).
      this.logger.error(`Could not save a ${type} lead: ${(err as Error).message}`);
      throw new ServiceUnavailableException('We could not save your request right now. Please try again shortly.');
    }
  }

  private save(type: 'DEMO_REQUEST' | 'CONTACT', dto: CreateLeadDto) {
    return this.model.create({
      type,
      name: dto.name,
      email: dto.email,
      company: dto.company,
      role: dto.role,
      orgType: dto.orgType,
      timing: dto.timing,
      topic: dto.topic,
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
