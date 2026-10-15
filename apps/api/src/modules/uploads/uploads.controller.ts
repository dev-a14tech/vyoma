import { Body, Controller, Post, UseGuards, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard.js';
import { UploadsService } from './uploads.service.js';
import { PresignUploadDto } from './dto/presign-upload.dto.js';
import { valid } from '../../common/valid.js';

@ApiTags('admin-uploads')
@UseGuards(AdminJwtGuard)
@Controller('admin/uploads')
export class UploadsController {
  constructor(@Inject(UploadsService) private readonly uploads: UploadsService) {}

  @Post('presign')
  presign(@Body(valid(PresignUploadDto)) dto: PresignUploadDto) {
    return this.uploads.presign(dto);
  }
}
