import { ValidationPipe } from '@nestjs/common';
import type { Type } from '@nestjs/common';

/**
 * Body validation pipe with the DTO class named explicitly.
 *
 * The global ValidationPipe finds a DTO class through TypeScript's emitted decorator
 * metadata. Vercel compiles the API with a bundler that does not emit it, so on Vercel
 * the global pipe would silently skip validation. Naming the class here works with or
 * without the metadata.
 */
export const valid = (dto: Type<unknown>) =>
  new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true, expectedType: dto });
