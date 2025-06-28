import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsUrl,
    IsOptional,
    IsUUID,
    IsDefined,
    ValidateNested,
    IsString,
    IsEmpty,
} from 'class-validator';
import { ShortUrl } from './url.contract';
import { isCleanSlug } from '../decorators/isCleanSlug.decorator';

export class CreateUrlDto implements Pick<ShortUrl, 'fullUrl' | 'userId'> {
    @IsNotEmpty()
    @IsUrl({
        require_valid_protocol: true,
        require_host: true,
        require_tld: true,
        require_protocol: true,
    })
    @IsString()
    @isCleanSlug()
    fullUrl: string;

    @IsOptional()
    @IsUUID()
    userId?: string;
}

export class ListAllUrlDto {
    @IsUUID()
    userId: string;
}

export class EditUrlDto {
    @IsUUID()
    id: string;

    @IsDefined()
    @ValidateNested()
    @Type(() => ShortUrl)
    update: Partial<Pick<ShortUrl, 'fullUrl'>>;
}

export class RemoveUrlDto implements Pick<ShortUrl, 'id'> {
    @IsUUID()
    id: string;
}

export class RedirectViaShortUrlDto implements Pick<ShortUrl, 'shortUrl'> {
    @IsString()
    shortUrl: string;
}
