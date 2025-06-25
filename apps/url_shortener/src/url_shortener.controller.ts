import { Controller, Get } from '@nestjs/common';
import { UrlShortenerService } from './url_shortener.service';

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Get()
  getHello(): string {
    return this.urlShortenerService.getHello();
  }
}
