import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { EnvPortNames } from '@app/config/config.enum';

async function bootstrap() {
    const app = await NestFactory.create(UsersModule, {
        cors: true,
    });
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Aplicação de Usuários')
        .setDescription('O serviço em formato Restful API do domínio de usuários')
        .setVersion('1.0')
        .addTag('users')
        .addBearerAuth()
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    };

    const documentFactory = () => SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('docs', app, documentFactory);

    const configService = app.get(ConfigService);
    const port = configService.get<number>(EnvPortNames.users) || 3001;
    void app.listen(port, () => {
        console.log('Users Service listening to ', port);
    });
}

void bootstrap();
