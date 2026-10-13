import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard.js';
import { Admin, AdminSchema } from '../../database/schemas/admin.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN', '12h') as `${number}${'s' | 'm' | 'h' | 'd'}`
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminJwtGuard],
  exports: [AdminJwtGuard, JwtModule]
})
export class AuthModule {}
