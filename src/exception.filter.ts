import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { errors } from './errors';
import { BaseExceptionFilter } from '@nestjs/core';
import { MyLogger } from './logger/MyLogger.service';

const logger = new MyLogger();

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host);
    logger.error(`${exception}`);
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: errors[status],
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

export const startUncaughtExceptionListener = () => {
  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught exception! ${err || ''}`);
  });
};

export const startUnhandledRejectionListener = () => {
  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled promise rejection! ${err || ''}`);
  });
};
