import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module.js';
import { PagesAdminController, PagesPublicController } from './pages.controller.js';
import { PagesService } from './pages.service.js';
import { PageContent, PageContentSchema } from '../../database/schemas/page-content.schema.js';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: PageContent.name, schema: PageContentSchema }])],
  controllers: [PagesPublicController, PagesAdminController],
  providers: [PagesService]
})
export class PagesModule {}
