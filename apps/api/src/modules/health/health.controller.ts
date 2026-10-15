import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import type { Connection } from 'mongoose';

const DB_STATES: Record<number, string> = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  // `status` says the API itself is up. `db` says whether MongoDB is reachable, which is
  // what the forms and the admin need (the chat does not).
  @Get()
  check() {
    return {
      status: 'ok',
      db: DB_STATES[this.connection.readyState] ?? 'unknown',
      timestamp: new Date().toISOString()
    };
  }
}
