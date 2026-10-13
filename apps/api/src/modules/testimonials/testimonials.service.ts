import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial, TestimonialDocument } from '../../database/schemas/testimonial.schema.js';
import { UpsertTestimonialDto } from './dto/upsert-testimonial.dto.js';

@Injectable()
export class TestimonialsService {
  constructor(@InjectModel(Testimonial.name) private readonly model: Model<TestimonialDocument>) {}

  findAllPublished() {
    return this.model.find({ published: true }).sort({ order: 1 });
  }

  findAllForAdmin() {
    return this.model.find().sort({ order: 1 });
  }

  async findOneForAdmin(id: string) {
    const testimonial = await this.model.findById(id);
    if (!testimonial) {
      throw new NotFoundException(`Testimonial ${id} not found`);
    }
    return testimonial;
  }

  create(dto: UpsertTestimonialDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: Partial<UpsertTestimonialDto>) {
    const testimonial = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!testimonial) {
      throw new NotFoundException(`Testimonial ${id} not found`);
    }
    return testimonial;
  }

  async remove(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Testimonial ${id} not found`);
    }
    return { ok: true };
  }
}
