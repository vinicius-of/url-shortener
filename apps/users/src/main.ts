import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.TCP,
    options: {
      port: 3001,
      retryAttempts: 3,
      retryDelay: 1000,
    },
  });

  app.listen();
}

bootstrap();
