import { AppException } from '../../core/response/app.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidApiKeyException extends AppException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, 'InvalidApiKey', 'Invalid API Key');
  }
}
