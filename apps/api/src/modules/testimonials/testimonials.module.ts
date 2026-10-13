import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module.js';
import { TestimonialsAdminController, TestimonialsPublicController } from './testimonials.controller.js';
import { TestimonialsService } from './testimonials.service.js';
import { Testimonial, TestimonialSchema } from '../../database/schemas/testimonial.schema.js';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: Testimonial.name, schema: TestimonialSchema }])],
  controllers: [TestimonialsPublicController, TestimonialsAdminController],
  providers: [TestimonialsService]
})
export class TestimonialsModule {}
