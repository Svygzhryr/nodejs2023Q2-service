import * as yaml from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { readFileSync } from 'fs';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AllExceptionsFilter,
  logLevels,
  startUncaughtExceptionListener,
  startUnhandledRejectionListener,
} from './exception.filter';
import { port } from './utils/constants';

async function bootstrap() {
  const location = path.join(__dirname, '..', 'doc', 'api.yaml');
  const file = readFileSync(location, { encoding: 'utf-8' });
  const document = yaml.parse(file);

  const level = logLevels[process.env.LOG_MAX_LEVEL || 6];
  const app = await NestFactory.create(AppModule, {
    logger: level,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  startUncaughtExceptionListener();
  startUnhandledRejectionListener();

  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
  console.log(`Server is listening on port ${port}`);
}

bootstrap();
