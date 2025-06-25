import { ShortUrl } from './url.contract';
import { ArchiveUrlDto, CreateUrlDto, EditUrlDto, ListAllUrlDto } from './url.dto';

export interface UrlShortenerService {
  create(data: CreateUrlDto): Promise<unknown>;
  listAll(data: ListAllUrlDto): Promise<ShortUrl>;
  update(data: EditUrlDto): Promise<unknown>;
  archive(data: ArchiveUrlDto): Promise<boolean>;
}
