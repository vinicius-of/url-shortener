import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GlobalConfigModule } from '@app/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity } from './entities/login.entity';
import { HttpModule } from '@nestjs/axios';
import { GuardsModule } from '@app/guards/guards.module';
import { ConfigService } from '@nestjs/config';
import path from 'path';

@Module({
    imports: [
        GlobalConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [GlobalConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const database = configService.get('DATABASE_CONFIG.dirAuth');
                const isDev = configService.get('SQLITE_SYNCHRONIZE') === 'true';

                return {
                    type: 'better-sqlite3',
                    database,
                    autoLoadEntities: true,
                    synchronize: isDev,
                };
            },
        }),
        TypeOrmModule.forFeature([LoginEntity]),
        HttpModule,
        GuardsModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
