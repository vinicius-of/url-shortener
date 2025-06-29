import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule, {
        // FIXME: Apply certificate if possible and apply cors protection
        cors: {},
    });
    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);
    const port = configService.get<number>('AUTH_API_PORT') || 3003;
    console.log('Auth Service Port: ', port);
    app.listen(port);
}

bootstrap();
