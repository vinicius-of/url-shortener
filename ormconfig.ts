import { DataSourceOptions } from 'typeorm';

const baseDir = __dirname;

export default [
    {
        name: 'auth',
        type: 'better-sqlite3',
        database: 'db/auth.sqlite3',
        entities: [`${baseDir}/apps/auth/src/entities/*.entity.{ts,js}`],
        migrations: [`${baseDir}/migrations/auth/*.{ts,js}`],
    },
    {
        name: 'users',
        type: 'better-sqlite3',
        database: 'db/users.sqlite3',
        entities: [`${baseDir}/apps/users/src/entities/*.entity.{ts,js}`],
        migrations: [`${baseDir}/migrations/users/*.{ts,js}`],
    },
    {
        name: 'urls',
        type: 'better-sqlite3',
        database: 'db/urls.sqlite3',
        entities: [`${baseDir}/apps/url_shortener/src/entities/*.entity.{ts,js}`],
        migrations: [`${baseDir}/migrations/urls/*.{ts,js}`],
    },
] as DataSourceOptions[];
