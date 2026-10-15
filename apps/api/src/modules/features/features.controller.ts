import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard.js';
import { FeaturesService } from './features.service.js';
import { UpsertFeatureDto } from './dto/upsert-feature.dto.js';
import { valid } from '../../common/valid.js';

@ApiTags('content')
@Controller('content/features')
export class FeaturesPublicController {
  constructor(@Inject(FeaturesService) private readonly features: FeaturesService) {}

  @Get()
  findAll() {
    return this.features.findAllPublished();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.features.findBySlug(slug);
  }
}

@ApiTags('admin-features')
@UseGuards(AdminJwtGuard)
@Controller('admin/features')
export class FeaturesAdminController {
  constructor(@Inject(FeaturesService) private readonly features: FeaturesService) {}

  @Get()
  findAll() {
    return this.features.findAllForAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.features.findOneForAdmin(id);
  }

  @Post()
  create(@Body(valid(UpsertFeatureDto)) dto: UpsertFeatureDto) {
    return this.features.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<UpsertFeatureDto>) {
    return this.features.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.features.remove(id);
  }
}
