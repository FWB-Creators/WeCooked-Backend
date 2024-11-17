import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
<<<<<<< HEAD
} from '@nestjs/common';
import { Response } from 'express';
=======
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
>>>>>>> b7701392 (chore: change gateway to gateway-service)

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger('Gateway Service');
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
<<<<<<< HEAD
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // const message = exception.message;
=======
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
>>>>>>> b7701392 (chore: change gateway to gateway-service)
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
