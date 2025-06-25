export interface ShortUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  userId?: string;
  archived?: boolean;
}
