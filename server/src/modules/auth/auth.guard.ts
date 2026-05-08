import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';
import {
  IdTokenExpiredException,
  InvalidTokenException,
  UnauthorizedException,
} from './auth.exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('FIREBASE_ADMIN')
    private readonly firebaseAdmin: firebaseAdmin.app.App,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException();

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException();

    const decodedToken = await this.firebaseAdmin
      .auth()
      .verifyIdToken(token)
      .catch((err) => {
        if (err.code === 'auth/id-token-expired') {
          throw new IdTokenExpiredException();
        }
        throw new InvalidTokenException();
      });

    request['user'] = { uid: decodedToken.uid };

    const userInDb = await this.usersService.findOne(decodedToken.uid);

    if (!userInDb) {
      await this.usersService.create({ uid: decodedToken.uid });
    }

    return true;
  }
}
