import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger('Chef Service');
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('Request...');
    next();
  }
}
