import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AudienceSegment, AudienceSegmentDocument } from '../../database/schemas/audience-segment.schema.js';
import { UpsertAudienceDto } from './dto/upsert-audience.dto.js';

@Injectable()
export class AudiencesService {
  constructor(@InjectModel(AudienceSegment.name) private readonly model: Model<AudienceSegmentDocument>) {}

  findAllPublished() {
    return this.model.find({ published: true }).sort({ order: 1 });
  }

  async findBySlug(slug: string) {
    const audience = await this.model.findOne({ slug, published: true });
    if (!audience) {
      throw new NotFoundException(`Audience "${slug}" not found`);
    }
    return audience;
  }

  findAllForAdmin() {
    return this.model.find().sort({ order: 1 });
  }

  async findOneForAdmin(id: string) {
    const audience = await this.model.findById(id);
    if (!audience) {
      throw new NotFoundException(`Audience ${id} not found`);
    }
    return audience;
  }

  create(dto: UpsertAudienceDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: Partial<UpsertAudienceDto>) {
    const audience = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!audience) {
      throw new NotFoundException(`Audience ${id} not found`);
    }
    return audience;
  }

  async remove(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Audience ${id} not found`);
    }
    return { ok: true };
  }
}
