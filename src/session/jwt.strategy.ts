import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private sessionService: SessionService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SALT
        })
    }

    async validate(payload: any): Promise<any> {
        const { sub, ...data } = payload
        return {
            id: sub,
            ...payload,
        }
    }
}