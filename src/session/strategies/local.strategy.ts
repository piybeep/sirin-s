import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SessionService } from './../session.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private sessionService: SessionService) {
        super()
    }

    async validate(email: string, password: string) {
        const user = await this.sessionService.validateUser({ email, password })
        if (!user) throw new UnauthorizedException('No such user')
        return user
    }

}