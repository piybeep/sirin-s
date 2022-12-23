import { Injectable, HttpException, HttpStatus, Res, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Repository } from 'typeorm';
import { compare, hash, genSalt, hashSync, genSaltSync } from 'bcrypt'
import { Response } from 'express';

import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { Sessions } from './entities/sessions.entity';
import { User } from '../users/entities/user.entity';
import { TokenDto } from './dto/token-payload.dto';


@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(Sessions)
        private readonly sessionRepository: Repository<Sessions>,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService
    ) {

    }

    async login(loginDto: LoginDto) {
        const errorResponse = {
            errors: {
                'email or password': 'is invalid'
            }
        }

        const user = await this.usersService.findOneBy({ email: loginDto.email })

        if (!user) {
            throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const isPasswordCorrect = await compare(loginDto.password, user.password)

        if (!isPasswordCorrect) {
            throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const tokens = await this.getTokens(user.id, user.email)
        await this.saveRefreshToken(tokens.refresh_token, user.id)
        return { tokens, user };
    }

    async getTokens(user_id: number, email: string) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: user_id,
                    email,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: user_id,
                    email,
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);
        return {
            access_token,
            refresh_token,
        };
    }

    async saveRefreshToken(refresh_token: string, user_id: number) {
        const hashed_refresh_token: string = this.hashData(refresh_token)
        const session = await this.sessionRepository.findOneBy({ user_id })
        let aa
        if (!session) {
            aa = await this.sessionRepository.save({ refresh_token: hashed_refresh_token, user_id })
        }
        else {
            aa = await this.sessionRepository.update({ user_id }, { refresh_token: hashed_refresh_token })
        }

        return
    }

    hashData(data: string) {
        const salt = genSaltSync(10)
        return hashSync(data, salt)
    }

    async logout(user: any) {
        return this.sessionRepository.update({ user_id: user.sub }, { refresh_token: "null" })
    }

    async refreshTokens(user: any, refresh_token: string) {
        const session = await this.sessionRepository.findOneBy({ user_id: user.sub })
        if (!session || !session.refresh_token)
            throw new ForbiddenException('Access Denied1');

        const refresh_token_matches = await compare(
            refresh_token,
            session.refresh_token,
        );
        if (!refresh_token_matches) throw new ForbiddenException('Access Denied2');

        const _user = await this.usersService.findOneBy({ id: session.user_id })
        if (!_user) throw new ForbiddenException('Access Denied3');

        const tokens = await this.getTokens(session.user_id, _user.email);
        await this.saveRefreshToken(tokens.refresh_token, _user.id,);
        return { ...tokens, _user };
    }
}