import { Module } from '@nestjs/common';
import { UrlShortenerController } from './urlShortener.controller';
import { UrlShortenerService } from './urlShortener.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlEntity } from './entities/shortUrl.entity';
import { HttpModule } from '@nestjs/axios';
import { GlobalConfigModule } from '@app/config';
import { GuardsModule } from '@app/guards/guards.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { databaseConfigs } from '@app/config/config.constants';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forFeature(databaseConfigs)],
            inject: [databaseConfigs.KEY],
            useFactory: (configService: ConfigType<typeof databaseConfigs>) => configService.urls,
        }),
        TypeOrmModule.forFeature([ShortUrlEntity]),
        HttpModule,
        GlobalConfigModule,
        GuardsModule,
    ],
    controllers: [UrlShortenerController],
    providers: [UrlShortenerService],
})
export class UrlShortenerModule {}
