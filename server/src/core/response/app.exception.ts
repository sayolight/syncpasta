import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse } from './response.interface';

export class AppException extends HttpException {
  constructor(status: HttpStatus, code: string, message: string) {
    super(
      {
        code,
        message,
      } as unknown as ApiResponse,
      status,
    );
  }
}
