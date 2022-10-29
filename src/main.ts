import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

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
