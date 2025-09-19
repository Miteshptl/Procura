import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey: string = process.env.API_KEY || 'default_api_key';

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (apiKey && apiKey === this.apiKey) {
      return true;
    }

    throw new UnauthorizedException('Invalid API Key');
  }
}