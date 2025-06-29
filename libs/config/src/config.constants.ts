import { registerAs } from '@nestjs/config';
import path from 'path';

export const API_HOSTS = registerAs('API_HOST', () => {
    const USERS_HOST = process.env.USERS_API || 'No USERS_API key found into .env';
    const URLS_HOST = process.env.URLS_API || 'No USERS_API key found into .env';
    const AUTH_HOST = process.env.AUTH_API || 'No USERS_API key found into .env';

    return {
        USERS_HOST,
        URLS_HOST,
        AUTH_HOST,
    };
});

export const DATABASE_CONFIG = registerAs('DATABASE_CONFIG', () => {
    return {
        dirAuth: path.resolve(process.cwd(), 'db', 'auth.sqlite3'),
        dirUsers: path.resolve(process.cwd(), 'db', 'users.sqlite3'),
        dirUrls: path.resolve(process.cwd(), 'db', 'urls.sqlite3'),
    };
});
