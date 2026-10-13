import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { PagesModule } from './modules/pages/pages.module.js';
import { FeaturesModule } from './modules/features/features.module.js';
import { AudiencesModule } from './modules/audiences/audiences.module.js';
import { TestimonialsModule } from './modules/testimonials/testimonials.module.js';
import { SiteSettingsModule } from './modules/site-settings/site-settings.module.js';
import { LeadsModule } from './modules/leads/leads.module.js';
import { UploadsModule } from './modules/uploads/uploads.module.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60_000, limit: 60 }],
    }),
    DatabaseModule,
    AuthModule,
    PagesModule,
    FeaturesModule,
    AudiencesModule,
    TestimonialsModule,
    SiteSettingsModule,
    LeadsModule,
    UploadsModule,
    HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
