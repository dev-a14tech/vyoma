import { Body, Controller, Get, Param, Put, UseGuards, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard.js';
import { SiteSettingsService } from './site-settings.service.js';

@ApiTags('content')
@Controller('content/settings')
export class SiteSettingsPublicController {
  constructor(@Inject(SiteSettingsService) private readonly settings: SiteSettingsService) {}

  @Get()
  findAll() {
    return this.settings.findAll();
  }
}

@ApiTags('admin-settings')
@UseGuards(AdminJwtGuard)
@Controller('admin/settings')
export class SiteSettingsAdminController {
  constructor(@Inject(SiteSettingsService) private readonly settings: SiteSettingsService) {}

  @Get()
  findAll() {
    return this.settings.findAll();
  }

  @Put(':key')
  upsert(@Param('key') key: string, @Body('value') value: unknown) {
    return this.settings.upsert(key, value);
  }
}
