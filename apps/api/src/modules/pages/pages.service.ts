import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageContent, PageContentDocument } from '../../database/schemas/page-content.schema.js';
import { UpsertPageDto } from './dto/upsert-page.dto.js';

@Injectable()
export class PagesService {
  constructor(@InjectModel(PageContent.name) private readonly model: Model<PageContentDocument>) {}

  async findBySlug(slug: string) {
    const page = await this.model.findOne({ slug });
    if (!page) {
      throw new NotFoundException(`Page "${slug}" not found`);
    }
    return page;
  }

  findAllForAdmin() {
    return this.model.find().sort({ slug: 1 });
  }

  async upsert(slug: string, dto: UpsertPageDto) {
    return this.model.findOneAndUpdate(
      { slug },
      { $set: { ...dto, blocks: dto.blocks ?? [] } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
}
