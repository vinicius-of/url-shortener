import { ShortUrl } from './url.contract';
import {
    RemoveUrlDto,
    CreateUrlDto,
    EditUrlDto,
    ListAllUrlDto,
    RedirectViaShortUrlDto,
} from './url.dto';

export interface UrlShortenerService {
    accessShortLink(data: RedirectViaShortUrlDto): Promise<ShortUrl>;
    create(data: CreateUrlDto): Promise<ShortUrl>;
    listAllUrls(data: ListAllUrlDto): Promise<ShortUrl[]>;
    update(data: EditUrlDto): Promise<boolean>;
    remove(data: RemoveUrlDto): Promise<boolean>;
}
