import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { SiteSettingsAdminController, SiteSettingsPublicController } from './site-settings.controller.js';
import { SiteSettingsService } from './site-settings.service.js';

@Module({
  imports: [AuthModule],
  controllers: [SiteSettingsPublicController, SiteSettingsAdminController],
  providers: [SiteSettingsService],
})
export class SiteSettingsModule {}
