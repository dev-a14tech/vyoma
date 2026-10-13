import { Injectable } from '@nestjs/common';
import { LeadType } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service.js';
import { CreateLeadDto, UpdateLeadStatusDto } from './dto/create-lead.dto.js';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  create(type: LeadType, dto: CreateLeadDto) {
    return this.prisma.leadSubmission.create({
      data: {
        type,
        name: dto.name,
        email: dto.email,
        company: dto.company,
        role: dto.role,
        message: dto.message,
        source: dto.source ?? 'website',
      },
    });
  }

  findAll() {
    return this.prisma.leadSubmission.findMany({ orderBy: { createdAt: 'desc' } });
  }

  updateStatus(id: string, dto: UpdateLeadStatusDto) {
    return this.prisma.leadSubmission.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}
