import { registerAs } from '@nestjs/config';

const baseUri = 'http://localhost:';

export const API_HOSTS = registerAs('API_HOST', () => {
    const USERS_HOST = baseUri + process.env.USERS_API_PORT + '/users';
    const URLS_HOST = baseUri + process.env.URLS_API_PORT + '/urls';
    const AUTH_HOST = baseUri + process.env.AUTH_API_PORT + '/auth';

    return {
        USERS_HOST: USERS_HOST,
        URLS_HOST: URLS_HOST,
        AUTH_HOST: AUTH_HOST,
    };
});
