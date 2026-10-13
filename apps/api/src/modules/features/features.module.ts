import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module.js';
import { FeaturesAdminController, FeaturesPublicController } from './features.controller.js';
import { FeaturesService } from './features.service.js';
import { FeatureTheme, FeatureThemeSchema } from '../../database/schemas/feature-theme.schema.js';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: FeatureTheme.name, schema: FeatureThemeSchema }])],
  controllers: [FeaturesPublicController, FeaturesAdminController],
  providers: [FeaturesService],
  exports: [FeaturesService]
})
export class FeaturesModule {}
