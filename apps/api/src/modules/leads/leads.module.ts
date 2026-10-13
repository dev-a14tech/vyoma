import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { LeadsAdminController, LeadsPublicController } from './leads.controller.js';
import { LeadsService } from './leads.service.js';

@Module({
  imports: [AuthModule],
  controllers: [LeadsPublicController, LeadsAdminController],
  providers: [LeadsService],
})
export class LeadsModule {}
