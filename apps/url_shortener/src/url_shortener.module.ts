import { Module } from '@nestjs/common';
import { UrlShortenerController } from './url_shortener.controller';
import { UrlShortenerService } from './url_shortener.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlEntity } from './entities/shortUrl.entity';
import { HttpModule } from '@nestjs/axios';
import { GlobalConfigModule } from '@app/config';
import { GuardsModule } from '@app/guards/guards.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'better-sqlite3',
            database: './db/urls.sqlite3',
            autoLoadEntities: true,
            synchronize: true,
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
