import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import { UpsertAudienceDto } from './dto/upsert-audience.dto.js';

@Injectable()
export class AudiencesService {
  constructor(private readonly prisma: PrismaService) {}

  findAllPublished() {
    return this.prisma.audienceSegment.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const audience = await this.prisma.audienceSegment.findUnique({ where: { slug } });
    if (!audience || !audience.published) {
      throw new NotFoundException(`Audience "${slug}" not found`);
    }
    return audience;
  }

  findAllForAdmin() {
    return this.prisma.audienceSegment.findMany({ orderBy: { order: 'asc' } });
  }

  async findOneForAdmin(id: string) {
    const audience = await this.prisma.audienceSegment.findUnique({ where: { id } });
    if (!audience) {
      throw new NotFoundException(`Audience ${id} not found`);
    }
    return audience;
  }

  create(dto: UpsertAudienceDto) {
    return this.prisma.audienceSegment.create({ data: { ...dto } });
  }

  async update(id: string, dto: Partial<UpsertAudienceDto>) {
    await this.findOneForAdmin(id);
    return this.prisma.audienceSegment.update({ where: { id }, data: { ...dto } });
  }

  async remove(id: string) {
    await this.findOneForAdmin(id);
    await this.prisma.audienceSegment.delete({ where: { id } });
    return { ok: true };
  }
}
