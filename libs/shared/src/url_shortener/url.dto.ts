import { ShortUrl } from './url.contract';

export type CreateUrlDto = Pick<ShortUrl, 'originalUrl' | 'userId'>;

export type ListAllUrlDto = Omit<ShortUrl, 'archived' | 'userId' | 'id'>;

export type EditUrlDto = {
  id: string;
  update: Partial<ShortUrl>;
};

export type ArchiveUrlDto = Pick<ShortUrl, 'id'>;
