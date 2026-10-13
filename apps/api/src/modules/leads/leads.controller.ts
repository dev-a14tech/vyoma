import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard.js';
import { LeadsService } from './leads.service.js';
import { CreateLeadDto, UpdateLeadStatusDto } from './dto/create-lead.dto.js';

@ApiTags('leads')
@Controller('leads')
export class LeadsPublicController {
  constructor(private readonly leads: LeadsService) {}

  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('demo-request')
  createDemoRequest(@Body() dto: CreateLeadDto) {
    return this.leads.create('DEMO_REQUEST', dto);
  }

  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('contact')
  createContact(@Body() dto: CreateLeadDto) {
    return this.leads.create('CONTACT', dto);
  }
}

@ApiTags('admin-leads')
@UseGuards(AdminJwtGuard)
@Controller('admin/leads')
export class LeadsAdminController {
  constructor(private readonly leads: LeadsService) {}

  @Get()
  findAll() {
    return this.leads.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateLeadStatusDto) {
    return this.leads.updateStatus(id, dto);
  }
}
