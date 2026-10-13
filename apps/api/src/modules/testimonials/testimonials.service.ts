import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import { UpsertTestimonialDto } from './dto/upsert-testimonial.dto.js';

@Injectable()
export class TestimonialsService {
  constructor(private readonly prisma: PrismaService) {}

  findAllPublished() {
    return this.prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  }

  findAllForAdmin() {
    return this.prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
  }

  async findOneForAdmin(id: string) {
    const testimonial = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) {
      throw new NotFoundException(`Testimonial ${id} not found`);
    }
    return testimonial;
  }

  create(dto: UpsertTestimonialDto) {
    return this.prisma.testimonial.create({ data: { ...dto } });
  }

  async update(id: string, dto: Partial<UpsertTestimonialDto>) {
    await this.findOneForAdmin(id);
    return this.prisma.testimonial.update({ where: { id }, data: { ...dto } });
  }

  async remove(id: string) {
    await this.findOneForAdmin(id);
    await this.prisma.testimonial.delete({ where: { id } });
    return { ok: true };
  }
}
