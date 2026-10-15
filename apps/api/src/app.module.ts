import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module.js';
import { PagesModule } from './modules/pages/pages.module.js';
import { FeaturesModule } from './modules/features/features.module.js';
import { AudiencesModule } from './modules/audiences/audiences.module.js';
import { TestimonialsModule } from './modules/testimonials/testimonials.module.js';
import { SiteSettingsModule } from './modules/site-settings/site-settings.module.js';
import { LeadsModule } from './modules/leads/leads.module.js';
import { UploadsModule } from './modules/uploads/uploads.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { ChatModule } from './modules/chat/chat.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI', 'mongodb://127.0.0.1:27018/vyoma_website')
      })
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60_000, limit: 60 }]
    }),
    AuthModule,
    PagesModule,
    FeaturesModule,
    AudiencesModule,
    TestimonialsModule,
    SiteSettingsModule,
    LeadsModule,
    UploadsModule,
    HealthModule,
    ChatModule
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }]
})
export class AppModule {}
