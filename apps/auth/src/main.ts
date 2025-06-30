import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule, {
        cors: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Aplicação de Autenticação')
        .setDescription('O serviço em formato Restful API do domínio de autenticação')
        .setVersion('1.0')
        .addTag('auth')
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    };

    const documentFactory = () => SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('docs', app, documentFactory);

    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);
    const port = configService.get<number>('AUTH_API_PORT') || 3003;
    console.log('Auth Service Port: ', port);
    app.listen(port);
}

bootstrap();
