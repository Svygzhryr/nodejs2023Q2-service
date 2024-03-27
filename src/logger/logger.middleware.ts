import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { MyLogger } from './MyLogger.service';
import { IRequest } from 'src/types';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new MyLogger();

  use(request: IRequest, response: Response, next: NextFunction): void {
    const { originalUrl } = request;
    let { body, query } = request;

    try {
      body = JSON.stringify(body);
      query = JSON.stringify(query);
    } catch (err) {
      const message = err;
      this.logger.error(message);
    }

    response.on('finish', () => {
      this.logger.logRequest(originalUrl, body, query);
      this.logger.logResponse(response.statusCode);
    });
    next();
  }
}
