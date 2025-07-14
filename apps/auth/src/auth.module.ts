import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GlobalConfigModule } from '@app/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity } from './entities/login.entity';
import { HttpModule } from '@nestjs/axios';
import { GuardsModule } from '@app/guards/guards.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { databaseConfigs } from '@app/config/config.constants';

@Module({
    imports: [
        GlobalConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forFeature(databaseConfigs)],
            inject: [databaseConfigs.KEY],
            useFactory: (configService: ConfigType<typeof databaseConfigs>) => configService.auth,
        }),
        TypeOrmModule.forFeature([LoginEntity]),
        HttpModule,
        GuardsModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
