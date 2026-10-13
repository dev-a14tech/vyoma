import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { AudiencesAdminController, AudiencesPublicController } from './audiences.controller.js';
import { AudiencesService } from './audiences.service.js';

@Module({
  imports: [AuthModule],
  controllers: [AudiencesPublicController, AudiencesAdminController],
  providers: [AudiencesService],
})
export class AudiencesModule {}
