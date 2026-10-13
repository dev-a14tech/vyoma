import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { TestimonialsAdminController, TestimonialsPublicController } from './testimonials.controller.js';
import { TestimonialsService } from './testimonials.service.js';

@Module({
  imports: [AuthModule],
  controllers: [TestimonialsPublicController, TestimonialsAdminController],
  providers: [TestimonialsService],
})
export class TestimonialsModule {}
