import { Module } from '@nestjs/common';
import { UrlShortenerController } from './url_shortener.controller';
import { UrlShortenerService } from './url_shortener.service';

@Module({
  imports: [],
  controllers: [UrlShortenerController],
  providers: [UrlShortenerService],
})
export class UrlShortenerModule {}
