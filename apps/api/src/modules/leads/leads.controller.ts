import { Body, Controller, Get, Param, Patch, Post, UseGuards, Inject } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard.js';
import { LeadsService } from './leads.service.js';
import { CreateLeadDto, UpdateLeadStatusDto } from './dto/create-lead.dto.js';
import { valid } from '../../common/valid.js';

@ApiTags('leads')
@Controller('leads')
export class LeadsPublicController {
  constructor(@Inject(LeadsService) private readonly leads: LeadsService) {}

  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('demo-request')
  createDemoRequest(@Body(valid(CreateLeadDto)) dto: CreateLeadDto) {
    return this.leads.create('DEMO_REQUEST', dto);
  }

  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('contact')
  createContact(@Body(valid(CreateLeadDto)) dto: CreateLeadDto) {
    return this.leads.create('CONTACT', dto);
  }
}

@ApiTags('admin-leads')
@UseGuards(AdminJwtGuard)
@Controller('admin/leads')
export class LeadsAdminController {
  constructor(@Inject(LeadsService) private readonly leads: LeadsService) {}

  @Get()
  findAll() {
    return this.leads.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body(valid(UpdateLeadStatusDto)) dto: UpdateLeadStatusDto) {
    return this.leads.updateStatus(id, dto);
  }
}
