import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { apisHosts, databaseConfigs, jwtAuthConfigs } from './config.constants';
import * as joi from 'joi';

@Module({
    imports: [
        NestConfigModule.forRoot({
            envFilePath: '.env',
            load: [apisHosts, databaseConfigs, jwtAuthConfigs],
            expandVariables: true,
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            global: true,
            ...jwtAuthConfigs.asProvider(),
        }),
    ],
})
export class GlobalConfigModule {}
