import { Body, Controller, Delete, Get, Param, Post, Put, Response } from '@nestjs/common';
import { UrlShortenerService } from './url_shortener.service';
import {
    RemoveUrlDto,
    CreateUrlDto,
    EditUrlDto,
    ListAllUrlDto,
    RedirectViaShortUrlDto,
    URL_ERROR_MESSAGES,
} from '@app/shared';
import { Public } from '@app/shared/decorators';
import { Response as ExpressResponse } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/urls')
export class UrlShortenerController {
    constructor(private readonly urlShortenerService: UrlShortenerService) {}

    @Public()
    @Post('/shorten')
    @ApiOperation({
        summary: 'Create a new short URL and return its data',
    })
    @ApiResponse({
        status: 200,
        description: 'Short URL created with success',
    })
    @ApiResponse({
        status: 500,
        description: URL_ERROR_MESSAGES.URL_NOT_CREATED,
    })
    async create(@Body() data: CreateUrlDto) {
        return await this.urlShortenerService.create(data);
    }

    @Public()
    @Get('/:shortUrl')
    @ApiOperation({
        summary: 'Redirects the client to the fullUrl saved',
    })
    @ApiResponse({
        status: 200,
        description: 'Short URL created with success',
    })
    @ApiResponse({
        status: 400,
        description: URL_ERROR_MESSAGES.URL_NOT_FOUND,
    })
    @ApiResponse({
        status: 500,
        description: URL_ERROR_MESSAGES.CLICK_NOT_COUNTED,
    })
    async redirectViaShortUrl(
        @Param() params: RedirectViaShortUrlDto,
        @Response() res: ExpressResponse,
    ) {
        const fullUrlFound = await this.urlShortenerService.accessShortLink(params);
        return res.redirect(fullUrlFound.fullUrl);
    }

    @Get('/get/:shortUrl')
    @ApiOperation({
        summary: 'Returns shortUrl data to the client',
    })
    @ApiResponse({
        status: 200,
        description: 'Short URL created with success',
    })
    @ApiResponse({
        status: 400,
        description: URL_ERROR_MESSAGES.URL_NOT_FOUND,
    })
    @ApiResponse({
        status: 500,
        description: URL_ERROR_MESSAGES.CLICK_NOT_COUNTED,
    })
    async findShortUrl(@Param() params: RedirectViaShortUrlDto) {
        return await this.urlShortenerService.accessShortLink(params);
    }

    @Get('/list/:userId')
    @ApiOperation({
        summary: 'Finds all shortUrls by the userId from User (JWT only)',
    })
    @ApiResponse({
        status: 200,
        description: 'All shortsUrls returns to the client',
    })
    async listAllUrls(@Param() params: ListAllUrlDto) {
        return await this.urlShortenerService.listAllUrls(params);
    }

    @Put()
    @ApiOperation({
        summary: 'Updates the shortUrl selected (JWT only)',
    })
    @ApiResponse({
        status: 200,
        description: 'Selected shortUrl was updated',
    })
    @ApiResponse({
        status: 400,
        description: 'ShortUrl not found to be updated',
    })
    async update(@Body() data: EditUrlDto) {
        return await this.urlShortenerService.update(data);
    }

    @ApiOperation({
        summary: 'Removes logicly the shortUrl selected from database (JWT only)',
    })
    @ApiResponse({
        status: 200,
        description: 'Selected shortUrl was removed',
    })
    @Delete('/:id')
    async remove(@Param() params: RemoveUrlDto) {
        return await this.urlShortenerService.remove(params);
    }
}
