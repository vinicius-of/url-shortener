import { ValidationPipe } from '@nestjs/common';
import { UrlShortenerModule } from './url_shortener.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(UrlShortenerModule, {
        cors: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Aplicação de Encurtamento de URLs')
        .setDescription(
            'O serviço em formato Restful API do domínio das URLs e seus serviços relacionados',
        )
        .setVersion('1.0')
        .addTag('urls')
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    };

    const documentFactory = () => SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('docs', app, documentFactory);

    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);
    const port = configService.get<number>('URLS_API_PORT') || 3002;
    console.log('Urls Service Port: ', port);
    app.listen(port);
}

bootstrap();
