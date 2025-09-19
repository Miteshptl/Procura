import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const provided = req.header('x-api-key') || req.query['api_key'] || req.header('authorization');
    const expected = process.env.API_KEY || 'dev-secret-api-key';
    if (!provided) throw new UnauthorizedException('API key required');
    const token = String(provided).startsWith('Bearer ')
      ? String(provided).replace(/^Bearer\s+/i, '').trim()
      : String(provided).trim();
    if (token !== expected) throw new UnauthorizedException('Invalid API key');
    return true;
  }
}
