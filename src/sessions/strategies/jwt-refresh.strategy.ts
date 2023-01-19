import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Request } from "express";
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        var cookieExctractor = function (req: any) {
            let refresh_token = null
            if (req && req.cookies) {
                refresh_token = req.cookies['refresh_token']
            }
            return refresh_token
        }
        super({
            jwtFromRequest: cookieExctractor,
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: any) {
        const refresh_token = req.cookies['refresh_token']
        return {
            ...payload, refresh_token
        }
    }

}