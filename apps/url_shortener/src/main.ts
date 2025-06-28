import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { UrlShortenerModule } from './url_shortener.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(UrlShortenerModule, {
        cors: {},
    });

    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);
    const port = configService.get<number>('URLS_API_PORT') || 3001;
    app.listen(port);
}

bootstrap();
