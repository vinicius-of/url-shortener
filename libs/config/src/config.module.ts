import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import { API_HOSTS } from './config.constants';

@Module({
    imports: [
        NestConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            load: [API_HOSTS],
        }),
        JwtModule.registerAsync({
            global: true,
            imports: [NestConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('JWT_SECRET'),
                signOptions: { expiresIn: config.get('EXPIRES_IN') || '1d' },
            }),
        }),
    ],
})
export class GlobalConfigModule {}
