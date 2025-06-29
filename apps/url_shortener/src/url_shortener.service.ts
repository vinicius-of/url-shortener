import {
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import {
    RemoveUrlDto,
    CreateUrlDto,
    EditUrlDto,
    ListAllUrlDto,
    UrlShortenerService as SharedUrlService,
    ShortUrl,
    AddCountLinkDto,
    URL_ERROR_MESSAGES,
    RedirectViaShortUrlDto,
} from '@app/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortUrlEntity } from './entities/shortUrl.entity';
import { Repository } from 'typeorm';
import { generateSuffixCode, generateUrlCode } from './utils/generateUrlCode';
import { API_HOSTS } from '@app/config/config.constants';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class UrlShortenerService implements SharedUrlService {
    constructor(
        private readonly axios: HttpService,
        @Inject(API_HOSTS.KEY) private readonly api_hosts: ConfigType<typeof API_HOSTS>,
        @InjectRepository(ShortUrlEntity)
        private readonly shortUrlRepository: Repository<ShortUrlEntity>,
    ) {}

    async accessShortLink(data: RedirectViaShortUrlDto): Promise<ShortUrl> {
        const shortUrlFound = await this.shortUrlRepository.findOneBy({
            shortUrl: data.shortUrl,
        });

        if (!shortUrlFound) {
            throw new NotFoundException(URL_ERROR_MESSAGES.URL_NOT_FOUND);
        }

        try {
            await this.shortUrlRepository
                .createQueryBuilder()
                .update()
                .set({
                    clicks: () => 'clicks + 1',
                })
                .where('id = :id', {
                    id: shortUrlFound.id,
                })
                .execute();

            return shortUrlFound;
        } catch (error) {
            throw new InternalServerErrorException(
                {
                    message: URL_ERROR_MESSAGES.URL_NOT_FOUND,
                },
                {
                    cause: new Error(error),
                },
            );
        }
    }

    async create(data: CreateUrlDto): Promise<ShortUrl> {
        const suffixCode = generateSuffixCode();
        const codeForShortUrl = generateUrlCode();

        const payload: Record<string, unknown> = {
            fullUrl: data.fullUrl,
            shortUrl: `${suffixCode}${codeForShortUrl}`,
            userId: data.userId ?? null,
        };

        const newShortUrl = await this.shortUrlRepository.save(payload);

        try {
            if (data?.userId) {
                await this.addCountToUser({ id: data.userId });
            }

            return newShortUrl;
        } catch (error) {
            throw new InternalServerErrorException(
                {
                    message: URL_ERROR_MESSAGES.CLICK_NOT_COUNTED,
                    error,
                },
                {
                    cause: new Error(error),
                },
            );
        }
    }

    async listAllUrls(data: ListAllUrlDto): Promise<ShortUrl[]> {
        return await this.shortUrlRepository.find({
            withDeleted: false,
            where: {
                userId: data.userId,
            },
        });
    }

    async update(data: EditUrlDto): Promise<boolean> {
        const shortUrl = await this.shortUrlRepository.findOne({
            where: {
                id: data.id,
            },
        });

        if (!shortUrl || shortUrl.removedAt) {
            throw new NotFoundException(URL_ERROR_MESSAGES.URL_NOT_FOUND);
        }

        const updated = await this.shortUrlRepository.update(
            {
                id: data.id,
            },
            {
                fullUrl: data.update.fullUrl,
            },
        );

        return updated.affected! > 0;
    }

    async remove(data: RemoveUrlDto): Promise<boolean> {
        const softDeleteResult = await this.shortUrlRepository.softDelete({
            id: data.id,
        });

        return softDeleteResult.affected! > 0;
    }

    async addCountToUser(data: AddCountLinkDto): Promise<void> {
        const response = await this.axios
            .put<void, AddCountLinkDto>(`${this.api_hosts.USERS_HOST}`, data)
            .pipe(
                catchError((error: AxiosError) => {
                    throw {
                        host: this.api_hosts.USERS_HOST,
                        body: data,
                        httpMessage: error.response?.data,
                        status: error.status,
                    };
                }),
            );

        (await firstValueFrom(response)).data;
    }
}
