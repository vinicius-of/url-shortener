import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GlobalConfigModule } from '@app/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity } from '../entities/login.entity';
import { HttpModule } from '@nestjs/axios';
import { GuardsModule } from '@app/guards/guards.module';

@Module({
    imports: [
        GlobalConfigModule,
        TypeOrmModule.forRoot({
            type: 'better-sqlite3',
            database: `./db/auth.sqlite3`,
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([LoginEntity]),
        HttpModule,
        GuardsModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
