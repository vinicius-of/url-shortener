import { Module } from '@nestjs/common';
import { UrlShortenerController } from './url_shortener.controller';
import { UrlShortenerService } from './url_shortener.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlEntity } from './entities/shortUrl.entity';
import { HttpModule } from '@nestjs/axios';
import { GlobalConfigModule } from '@app/config';
import { GuardsModule } from '@app/guards/guards.module';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [GlobalConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const database: string = configService.get<string>('DATABASE_CONFIG.dirUrls')!;
                const isDev: boolean = configService.get<string>('SQLITE_SYNCHRONIZE') === 'true';

                return {
                    type: 'better-sqlite3',
                    database,
                    autoLoadEntities: true,
                    synchronize: isDev,
                };
            },
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
