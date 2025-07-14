import { ConfigModule, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';

export const apisHosts = registerAs('apis', () => {
    const usersHost = process.env.USERS_API!;
    const urlsHost = process.env.URLS_API!;
    const authHost = process.env.AUTH_API!;

    return {
        usersHost,
        urlsHost,
        authHost,
    };
});

export const jwtAuthConfigs = registerAs('jwtAuthConfigs', async () => {
    await ConfigModule.envVariablesLoaded;

    return {
        secret: process.env.JWT_SECRET!,
        signOptions: { expiresIn: process.env.EXPIRES_IN! || '1d' },
    };
});

export const databaseConfigs = registerAs('database', () => {
    const basicConfig: Partial<TypeOrmModuleOptions> = {
        type: 'better-sqlite3',
        autoLoadEntities: true,
        synchronize: Boolean(process.env.SQLITE_SYNCHRONIZE) || false,
    };

    return {
        auth: {
            ...basicConfig,
            database: path.resolve(process.cwd(), 'db', 'auth.sqlite3'),
        },
        users: {
            ...basicConfig,
            database: path.resolve(process.cwd(), 'db', 'users.sqlite3'),
        },
        urls: {
            ...basicConfig,
            database: path.resolve(process.cwd(), 'db', 'urls.sqlite3'),
        },
    };
});
