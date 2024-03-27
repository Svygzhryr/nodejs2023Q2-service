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

async function bootstrap() {
  const location = path.join(__dirname, '..', 'doc', 'api.yaml');
  const file = readFileSync(location, { encoding: 'utf-8' });
  const document = yaml.parse(file);

  const port = process.env.PORT || 4000;
  const level = logLevels[process.env.LOG_MAX_LEVEL];
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
