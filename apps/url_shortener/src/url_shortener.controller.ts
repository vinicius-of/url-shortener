import { Body, Controller, Delete, Get, Param, Post, Put, Response } from '@nestjs/common';
import { UrlShortenerService } from './url_shortener.service';
import {
    RemoveUrlDto,
    CreateUrlDto,
    EditUrlDto,
    ListAllUrlDto,
    RedirectViaShortUrlDto,
} from '@app/shared';
import { Public } from '@app/shared/decorators';
import { Response as ExpressResponse } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('/urls')
export class UrlShortenerController {
    constructor(
        private readonly urlShortenerService: UrlShortenerService,
        private readonly configService: ConfigService,
    ) {}

    @Public()
    @Post('/shorten')
    async create(@Body() data: CreateUrlDto) {
        return await this.urlShortenerService.create(data);
    }

    @Public()
    @Get('/:shortUrl')
    async redirectViaShortUrl(
        @Param() params: RedirectViaShortUrlDto,
        @Response() res: ExpressResponse,
    ) {
        const fullUrlFound = await this.urlShortenerService.accessShortLink(params);
        return res.redirect(fullUrlFound.fullUrl);
    }

    @Get('/get/:shortUrl')
    async findShortUrl(@Param() params: RedirectViaShortUrlDto) {
        return await this.urlShortenerService.accessShortLink(params);
    }

    @Get('/list/:userId')
    async listAllUrls(@Param() params: ListAllUrlDto) {
        return await this.urlShortenerService.listAllUrls(params);
    }

    @Put()
    async update(@Body() data: EditUrlDto) {
        return await this.urlShortenerService.update(data);
    }

    @Delete('/:id')
    async remove(@Param() params: RemoveUrlDto) {
        return await this.urlShortenerService.remove(params);
    }
}
