import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

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
          throw new UnauthorizedException(
            'Session expired. Please re-authenticate.',
          );
        }
        throw new UnauthorizedException('Invalid token');
      });

    request['user'] = decodedToken;

    const userInDb = await this.usersService.findOne(decodedToken.uid);

    if (!userInDb) {
      await this.usersService.create({ uid: decodedToken.uid });
    }

    return true;
  }
}
