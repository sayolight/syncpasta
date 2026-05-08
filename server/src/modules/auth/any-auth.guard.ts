import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiKeyGuard } from '../applications/api-key.guard';
import { AuthGuard } from './auth.guard';
import { AppException } from '../../core/response/app.exception';
import { Request } from 'express';
import { UnauthorizedException } from './auth.exceptions';

async function tryGuard(guard: CanActivate, context: ExecutionContext) {
  try {
    return { success: await guard.canActivate(context) };
  } catch (err) {
    if (err instanceof AppException) {
      return { success: false, exception: err };
    }
    return { success: false };
  }
}

@Injectable()
export class AnyAuthGuard implements CanActivate {
  constructor(
    private readonly apiKeyGuard: ApiKeyGuard,
    private readonly authGuard: AuthGuard,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    const authType = authHeader?.split(' ')[0];

    if (authType === 'ApiKey') {
      const apiKeyResult = await tryGuard(this.apiKeyGuard, context);
      if (apiKeyResult.success) {
        return true;
      }
      throw apiKeyResult.exception ?? new UnauthorizedException();
    }

    if (authType === 'Bearer') {
      const authResult = await tryGuard(this.authGuard, context);
      if (authResult.success) {
        return true;
      }
      throw authResult.exception ?? new UnauthorizedException();
    }

    throw new UnauthorizedException();
  }
}
