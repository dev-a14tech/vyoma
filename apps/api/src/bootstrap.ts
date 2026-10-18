import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { AppModule } from './app.module.js';

// The admin panel and the shared types use `id`, but Mongo documents serialise as `_id`.
// Expose `id` (and drop `_id` and `__v`) on every JSON response.
mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, ...rest } = ret as Record<string, unknown>;
    void _id;
    return rest;
  },
});

// Misconfiguration that would otherwise show up as a confusing failure later.
function warnAboutConfig() {
  if (process.env.NODE_ENV !== 'production') return;
  if (!process.env.MONGODB_URI) console.warn('[config] MONGODB_URI is not set: the forms and the admin cannot save or read data.');
  if (!process.env.JWT_SECRET) console.warn('[config] JWT_SECRET is not set: admin sign-in will fail.');
  if (!process.env.CORS_ORIGIN) console.warn('[config] CORS_ORIGIN is not set: using http://localhost:3000.');
  if (!process.env.GEMINI_API_KEY) console.warn('[config] GEMINI_API_KEY is not set: the chat assistant stays hidden.');
}

async function bootstrap() {
  warnAboutConfig();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Behind Vercel's proxy every request arrives from the proxy's address. Trust the first
  // hop so req.ip is the real visitor: otherwise the rate limiter (forms: 5 per minute,
  // chat: 12) would be shared by ALL visitors and lock everyone out together.
  app.set('trust proxy', 1);

  app.use(cookieParser());

  // Comma-separated so the admin subdomain (admin.vyoma.aero) can be allowed alongside
  // the public site without needing two different api deployments.
  const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000').split(',').map((o) => o.trim());
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // No exclusions: every route, including /health, lives under /api so a single
  // Vercel rewrite ("/api/(.*)" -> this service) covers the whole app.
  app.setGlobalPrefix('api');

  // API docs are for development. In production they are off: Swagger UI serves static
  // files from node_modules, which a bundled single-file build does not have.
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('VYOMA Website CMS API')
      .setDescription('Content API powering the VYOMA marketing site and its admin panel')
      .setVersion('0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`VYOMA API listening on http://localhost:${port} (docs at /api/docs)`);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
