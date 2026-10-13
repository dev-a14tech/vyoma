import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service.js';
import { UpsertPageDto } from './dto/upsert-page.dto.js';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySlug(slug: string) {
    const page = await this.prisma.pageContent.findUnique({ where: { slug } });
    if (!page) {
      throw new NotFoundException(`Page "${slug}" not found`);
    }
    return page;
  }

  findAllForAdmin() {
    return this.prisma.pageContent.findMany({ orderBy: { slug: 'asc' } });
  }

  async upsert(slug: string, dto: UpsertPageDto) {
    const { blocks: rawBlocks, ...rest } = dto;
    const blocks = (rawBlocks ?? []) as unknown as Prisma.InputJsonValue;
    return this.prisma.pageContent.upsert({
      where: { slug },
      create: { slug, ...rest, blocks },
      update: { ...rest, ...(rawBlocks ? { blocks } : {}) },
    });
  }
}
