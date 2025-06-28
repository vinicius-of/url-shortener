import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user/user.entity';
import { GlobalConfigModule } from '@app/config';
import { GuardsModule } from '@app/guards/guards.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'better-sqlite3',
            database: `./db/users.sqlite3`,
            autoLoadEntities: true,
            synchronize: true,
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
