import { AppException } from '../../core/response/app.exception';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends AppException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', 'Unauthorized');
  }
}

export class IdTokenExpiredException extends AppException {
  constructor() {
    super(
      HttpStatus.UNAUTHORIZED,
      'ID_TOKEN_EXPIRED',
      'Session expired. Please re-authenticate.',
    );
  }
}

export class InvalidTokenException extends AppException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, 'ID_TOKEN_INVALID', 'Invalid ID token');
  }
}
