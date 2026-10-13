import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { FeaturesAdminController, FeaturesPublicController } from './features.controller.js';
import { FeaturesService } from './features.service.js';

@Module({
  imports: [AuthModule],
  controllers: [FeaturesPublicController, FeaturesAdminController],
  providers: [FeaturesService],
  exports: [FeaturesService],
})
export class FeaturesModule {}
