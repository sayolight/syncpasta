import { AppException } from '../../core/response/app.exception';
import { HttpStatus } from '@nestjs/common';

export class NoTextOrFileProvidedException extends AppException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      'NoTextOrFileProvided',
      'Pasta must have text or a file',
    );
  }
}

export class PastaNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, 'PastaNotFound', 'Pasta does not exist');
  }
}
