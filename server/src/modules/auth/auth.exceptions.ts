import { AppException } from '../../core/response/app.exception';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends AppException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, 'Unauthorized', 'Unauthorized');
  }
}

export class IdTokenExpiredException extends AppException {
  constructor() {
    super(
      HttpStatus.UNAUTHORIZED,
      'IdTokenExpired',
      'Session expired. Please re-authenticate.',
    );
  }
}

export class InvalidTokenException extends AppException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, 'IdTokenInvalid', 'Invalid ID token');
  }
}
