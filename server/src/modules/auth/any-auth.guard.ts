import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiKeyGuard } from '../api-key/api-key.guard';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AnyAuthGuard implements CanActivate {
  constructor(
    private readonly apiKeyGuard: ApiKeyGuard,
    private readonly authGuard: AuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const apiKeyPassed = await this.apiKeyGuard.canActivate(context);
      if (apiKeyPassed) return true;
    } catch (e) {}

    try {
      const authPassed = await this.authGuard.canActivate(context);
      if (authPassed) return true;
    } catch (e) {}

    return false;
  }
}
