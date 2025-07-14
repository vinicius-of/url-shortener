import { DataSource } from 'typeorm';
import { ShortUrlEntity } from './shortUrl.entity';

export default new DataSource({
    type: 'better-sqlite3',
    database: 'db/urls.sqlite3',
    entities: [ShortUrlEntity],
    migrations: ['migrations/users/*.ts'],
});
