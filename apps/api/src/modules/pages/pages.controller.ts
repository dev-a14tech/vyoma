import { Body, Controller, Get, Param, Put, UseGuards, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard.js';
import { PagesService } from './pages.service.js';
import { UpsertPageDto } from './dto/upsert-page.dto.js';
import { valid } from '../../common/valid.js';

@ApiTags('content')
@Controller('content/pages')
export class PagesPublicController {
  constructor(@Inject(PagesService) private readonly pages: PagesService) {}

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.pages.findBySlug(slug);
  }
}

@ApiTags('admin-pages')
@UseGuards(AdminJwtGuard)
@Controller('admin/pages')
export class PagesAdminController {
  constructor(@Inject(PagesService) private readonly pages: PagesService) {}

  @Get()
  findAll() {
    return this.pages.findAllForAdmin();
  }

  @Put(':slug')
  upsert(@Param('slug') slug: string, @Body(valid(UpsertPageDto)) dto: UpsertPageDto) {
    return this.pages.upsert(slug, dto);
  }
}
