import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface AdminJwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AdminJwtGuard implements CanActivate {
  constructor(@Inject(JwtService) private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('Missing admin token');
    }

    try {
      const payload = await this.jwt.verifyAsync<AdminJwtPayload>(token);
      (request as Request & { admin: AdminJwtPayload }).admin = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired admin token');
    }
  }

  private extractToken(request: Request): string | null {
    const header = request.headers.authorization;
    if (header?.startsWith('Bearer ')) {
      return header.slice(7);
    }
    const cookieToken = (request as Request & { cookies?: Record<string, string> }).cookies?.vyoma_admin_token;
    return cookieToken ?? null;
  }
}
