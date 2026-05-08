import { AppException } from '../../core/response/app.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidApiKeyException extends AppException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, 'INVALID_API_KEY', 'Invalid API Key');
  }
}
