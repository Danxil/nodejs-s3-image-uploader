import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import OS from 'os';

process.env.UV_THREADPOOL_SIZE = OS.cpus().length.toString();

async function bootstrap() {
  // const fastifyAdapter = new FastifyAdapter();
  //
  // fastifyAdapter
  //   .getInstance()
  //   .addContentTypeParser(/^image\/.*/, function (request, payload, done) {
  //     done(undefined, payload);
  //   });

  const app = await NestFactory.create(
    AppModule,
    // fastifyAdapter,
    {
      bodyParser: false,
    },
  );
  await app.listen(3000);
}
bootstrap();
