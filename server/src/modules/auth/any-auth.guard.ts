import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiKeyGuard } from '../applications/api-key.guard';
import { AuthGuard } from './auth.guard';
import { Observable } from 'rxjs';

async function tryGuard(
  guard: CanActivate,
  context: ExecutionContext,
): Promise<boolean | Observable<boolean>> {
  try {
    return await guard.canActivate(context);
  } catch {
    return false;
  }
}

@Injectable()
export class AnyAuthGuard implements CanActivate {
  constructor(
    private readonly apiKeyGuard: ApiKeyGuard,
    private readonly authGuard: AuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (await tryGuard(this.apiKeyGuard, context)) return true;
    return !!(await tryGuard(this.authGuard, context));
  }
}
