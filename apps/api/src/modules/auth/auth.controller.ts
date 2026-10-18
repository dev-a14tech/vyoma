import { Body, Controller, Get, Post, Req, Res, UseGuards, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AdminJwtGuard, AdminJwtPayload } from '../../common/guards/admin-jwt.guard.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { valid } from '../../common/valid.js';

const COOKIE_NAME = 'vyoma_admin_token';

@ApiTags('admin-auth')
@Controller('admin/auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(valid(LoginDto)) dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto);
    // In production the api now lives on its own domain (EC2), separate from the web
    // app's domain, so the browser treats every request between them as cross-site.
    // Only a SameSite=None cookie is sent cross-site at all, and None requires Secure.
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie(COOKIE_NAME, result.accessToken, {
      httpOnly: true,
      sameSite: isProd ? 'none' : 'lax',
      secure: isProd,
      maxAge: 1000 * 60 * 60 * 12,
    });
    return result;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie(COOKIE_NAME, { sameSite: isProd ? 'none' : 'lax', secure: isProd });
    return { ok: true };
  }

  @UseGuards(AdminJwtGuard)
  @Get('me')
  me(@Req() req: Request & { admin: AdminJwtPayload }) {
    return this.authService.me(req.admin.sub);
  }
}
