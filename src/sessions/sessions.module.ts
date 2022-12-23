import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { getJWTConfig } from '../configs/jwt.config'
import { Sessions } from './entities/sessions.entity';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { UsersModule } from './../users/users.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([Sessions]),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJWTConfig
        }),
        PassportModule,
        UsersModule,
    ],
    controllers: [SessionsController],
    providers: [SessionsService, JwtAccessStrategy, JwtRefreshStrategy]
})
export class SessionsModule { }
