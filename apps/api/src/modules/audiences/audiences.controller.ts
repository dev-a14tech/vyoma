import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard.js';
import { AudiencesService } from './audiences.service.js';
import { UpsertAudienceDto } from './dto/upsert-audience.dto.js';

@ApiTags('content')
@Controller('content/audiences')
export class AudiencesPublicController {
  constructor(private readonly audiences: AudiencesService) {}

  @Get()
  findAll() {
    return this.audiences.findAllPublished();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.audiences.findBySlug(slug);
  }
}

@ApiTags('admin-audiences')
@UseGuards(AdminJwtGuard)
@Controller('admin/audiences')
export class AudiencesAdminController {
  constructor(private readonly audiences: AudiencesService) {}

  @Get()
  findAll() {
    return this.audiences.findAllForAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audiences.findOneForAdmin(id);
  }

  @Post()
  create(@Body() dto: UpsertAudienceDto) {
    return this.audiences.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<UpsertAudienceDto>) {
    return this.audiences.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audiences.remove(id);
  }
}
