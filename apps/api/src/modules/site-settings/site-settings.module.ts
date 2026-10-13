import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module.js';
import { SiteSettingsAdminController, SiteSettingsPublicController } from './site-settings.controller.js';
import { SiteSettingsService } from './site-settings.service.js';
import { SiteSetting, SiteSettingSchema } from '../../database/schemas/site-setting.schema.js';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: SiteSetting.name, schema: SiteSettingSchema }])],
  controllers: [SiteSettingsPublicController, SiteSettingsAdminController],
  providers: [SiteSettingsService]
})
export class SiteSettingsModule {}
