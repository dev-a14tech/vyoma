import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module.js';
import { AudiencesAdminController, AudiencesPublicController } from './audiences.controller.js';
import { AudiencesService } from './audiences.service.js';
import { AudienceSegment, AudienceSegmentSchema } from '../../database/schemas/audience-segment.schema.js';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: AudienceSegment.name, schema: AudienceSegmentSchema }])],
  controllers: [AudiencesPublicController, AudiencesAdminController],
  providers: [AudiencesService]
})
export class AudiencesModule {}
