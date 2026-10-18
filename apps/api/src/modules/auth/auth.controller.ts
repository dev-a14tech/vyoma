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
    // api.vyoma.aero and www.vyoma.aero share the registrable domain vyoma.aero, so a
    // cookie scoped to the whole domain (not just the host that set it) is sent on
    // requests to both - same-site, no SameSite=None/cross-site cookie games needed.
    // Safari's Intelligent Tracking Prevention blocks genuinely cross-site cookies even
    // with SameSite=None set, which is what forced this domain setup in the first place.
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie(COOKIE_NAME, result.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      domain: isProd ? '.vyoma.aero' : undefined,
      maxAge: 1000 * 60 * 60 * 12,
    });
    return result;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie(COOKIE_NAME, { sameSite: 'lax', secure: isProd, domain: isProd ? '.vyoma.aero' : undefined });
    return { ok: true };
  }

  @UseGuards(AdminJwtGuard)
  @Get('me')
  me(@Req() req: Request & { admin: AdminJwtPayload }) {
    return this.authService.me(req.admin.sub);
  }
}
