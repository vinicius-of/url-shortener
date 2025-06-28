import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerController } from './url_shortener.controller';
import { UrlShortenerService } from './url_shortener.service';

describe('UrlShortenerController', () => {
    let urlShortenerController: UrlShortenerController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UrlShortenerController],
            providers: [UrlShortenerService],
        }).compile();

        urlShortenerController = app.get<UrlShortenerController>(UrlShortenerController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(urlShortenerController.getHello()).toBe('Hello World!');
        });
    });
});
