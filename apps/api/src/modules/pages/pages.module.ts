import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { PagesAdminController, PagesPublicController } from './pages.controller.js';
import { PagesService } from './pages.service.js';

@Module({
  imports: [AuthModule],
  controllers: [PagesPublicController, PagesAdminController],
  providers: [PagesService],
})
export class PagesModule {}
