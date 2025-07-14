import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { GlobalConfigModule } from '@app/config';
import { GuardsModule } from '@app/guards/guards.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { databaseConfigs } from '@app/config/config.constants';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forFeature(databaseConfigs)],
            inject: [databaseConfigs.KEY],
            useFactory: (configService: ConfigType<typeof databaseConfigs>) => configService.users,
        }),
        TypeOrmModule.forFeature([UserEntity]),
        GlobalConfigModule,
        GuardsModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
