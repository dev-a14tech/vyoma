import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard.js';
import { TestimonialsService } from './testimonials.service.js';
import { UpsertTestimonialDto } from './dto/upsert-testimonial.dto.js';

@ApiTags('content')
@Controller('content/testimonials')
export class TestimonialsPublicController {
  constructor(private readonly testimonials: TestimonialsService) {}

  @Get()
  findAll() {
    return this.testimonials.findAllPublished();
  }
}

@ApiTags('admin-testimonials')
@UseGuards(AdminJwtGuard)
@Controller('admin/testimonials')
export class TestimonialsAdminController {
  constructor(private readonly testimonials: TestimonialsService) {}

  @Get()
  findAll() {
    return this.testimonials.findAllForAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testimonials.findOneForAdmin(id);
  }

  @Post()
  create(@Body() dto: UpsertTestimonialDto) {
    return this.testimonials.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<UpsertTestimonialDto>) {
    return this.testimonials.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testimonials.remove(id);
  }
}
