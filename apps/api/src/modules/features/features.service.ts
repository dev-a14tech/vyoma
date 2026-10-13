import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeatureTheme, FeatureThemeDocument } from '../../database/schemas/feature-theme.schema.js';
import { UpsertFeatureDto } from './dto/upsert-feature.dto.js';

@Injectable()
export class FeaturesService {
  constructor(@InjectModel(FeatureTheme.name) private readonly model: Model<FeatureThemeDocument>) {}

  findAllPublished() {
    return this.model.find({ published: true }).sort({ order: 1 });
  }

  async findBySlug(slug: string) {
    const feature = await this.model.findOne({ slug, published: true });
    if (!feature) {
      throw new NotFoundException(`Feature "${slug}" not found`);
    }
    return feature;
  }

  findAllForAdmin() {
    return this.model.find().sort({ order: 1 });
  }

  async findOneForAdmin(id: string) {
    const feature = await this.model.findById(id);
    if (!feature) {
      throw new NotFoundException(`Feature ${id} not found`);
    }
    return feature;
  }

  create(dto: UpsertFeatureDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: Partial<UpsertFeatureDto>) {
    const feature = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!feature) {
      throw new NotFoundException(`Feature ${id} not found`);
    }
    return feature;
  }

  async remove(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Feature ${id} not found`);
    }
    return { ok: true };
  }
}
