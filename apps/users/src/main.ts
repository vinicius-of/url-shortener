import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(UsersModule, {
        // FIXME: Apply certificate if possible and apply cors protection
        cors: {},
    });
    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);
    const port = configService.get<number>('USERS_API_PORT') || 3001;
    console.log('Users Service Port: ', port);
    app.listen(port);
}

bootstrap();
