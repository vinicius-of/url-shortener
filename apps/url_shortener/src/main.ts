
import { UrlShortenerModule } from './url_shortener.module';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UrlShortenerModule, {
    transport: Transport.TCP,
    options: {
      port: 3002,
      retryAttempts: 3,
      retryDelay: 1000,
    },
  });

  app.listen();
}

bootstrap();
