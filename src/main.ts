import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import OS from 'os';

process.env.UV_THREADPOOL_SIZE = OS.cpus().length.toString();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  await app.listen(3000);
}
bootstrap();
