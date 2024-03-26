import * as yaml from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { readFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const location = path.join(__dirname, '..', 'doc', 'api.yaml');
  const file = readFileSync(location, { encoding: 'utf-8' });
  const document = yaml.parse(file);

  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
  console.log(`Server is listening on port ${port}`);
}

bootstrap();
