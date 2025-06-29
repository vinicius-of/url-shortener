import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { GlobalConfigModule } from '@app/config';
import { GuardsModule } from '@app/guards/guards.module';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [GlobalConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const database = configService.get('DATABASE_CONFIG.dirUsers');
                const isDev = configService.get('SQLITE_SYNCHRONIZE') === 'true';

                return {
                    type: 'better-sqlite3',
                    database,
                    autoLoadEntities: true,
                    synchronize: isDev,
                };
            },
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
