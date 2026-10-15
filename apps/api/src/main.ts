import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
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

  const config = new DocumentBuilder()
    .setTitle('VYOMA Website CMS API')
    .setDescription('Content API powering the VYOMA marketing site and its admin panel')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`VYOMA API listening on http://localhost:${port} (docs at /api/docs)`);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
