import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import { UpsertFeatureDto } from './dto/upsert-feature.dto.js';

@Injectable()
export class FeaturesService {
  constructor(private readonly prisma: PrismaService) {}

  findAllPublished() {
    return this.prisma.featureTheme.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const feature = await this.prisma.featureTheme.findUnique({ where: { slug } });
    if (!feature || !feature.published) {
      throw new NotFoundException(`Feature "${slug}" not found`);
    }
    return feature;
  }

  findAllForAdmin() {
    return this.prisma.featureTheme.findMany({ orderBy: { order: 'asc' } });
  }

  async findOneForAdmin(id: string) {
    const feature = await this.prisma.featureTheme.findUnique({ where: { id } });
    if (!feature) {
      throw new NotFoundException(`Feature ${id} not found`);
    }
    return feature;
  }

  create(dto: UpsertFeatureDto) {
    return this.prisma.featureTheme.create({
      data: { ...dto, capabilities: dto.capabilities },
    });
  }

  async update(id: string, dto: Partial<UpsertFeatureDto>) {
    await this.findOneForAdmin(id);
    return this.prisma.featureTheme.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: string) {
    await this.findOneForAdmin(id);
    await this.prisma.featureTheme.delete({ where: { id } });
    return { ok: true };
  }
}
