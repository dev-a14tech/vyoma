import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module.js';
import { LeadsAdminController, LeadsPublicController } from './leads.controller.js';
import { LeadsService } from './leads.service.js';
import { LeadSubmission, LeadSubmissionSchema } from '../../database/schemas/lead-submission.schema.js';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: LeadSubmission.name, schema: LeadSubmissionSchema }])],
  controllers: [LeadsPublicController, LeadsAdminController],
  providers: [LeadsService]
})
export class LeadsModule {}
