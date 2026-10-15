import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../../database/schemas/admin.schema.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    @Inject(JwtService) private readonly jwt: JwtService
  ) {}

  async login(dto: LoginDto) {
    const admin = await this.adminModel.findOne({ email: dto.email });
    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await bcrypt.compare(dto.password, admin.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = await this.jwt.signAsync({ sub: admin.id, email: admin.email });

    return {
      accessToken: token,
      admin: { id: admin.id, email: admin.email, name: admin.name }
    };
  }

  async me(adminId: string) {
    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return { id: admin.id, email: admin.email, name: admin.name };
  }
}
