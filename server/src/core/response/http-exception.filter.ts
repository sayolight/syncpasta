import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from './response.interface';
import { Error } from './response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as Error;

    const error: Error = {
      code: exceptionResponse.code || 'UNKNOWN_ERROR',
      message: exceptionResponse.message,
    };

    const body: ApiResponse = {
      success: false,
      error,
      timestamp: new Date().toISOString(),
    };

    return response.status(status).json(body);
  }
}
