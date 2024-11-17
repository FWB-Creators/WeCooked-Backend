import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger('Gateway Service');
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const responseBody = exception.getResponse() as any;

    // this.logger.log(`Http Exception: ${message}`);

    response.status(status).json({
      message: responseBody.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      //   path: request.url,
    });
  }
}
