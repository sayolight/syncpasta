import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApplicationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException();

    const apiKey = authHeader.split(' ')[1];
    if (!apiKey) throw new UnauthorizedException();

    const validation = await this.apiKeyService.validateApiKey(apiKey);
    if (!validation.isValid) throw new UnauthorizedException();

    request['user'] = { uid: validation.uid! };

    if (validation.applicationId) {
      request['application'] = { id: validation.applicationId };
    }
    return true;
  }
}
