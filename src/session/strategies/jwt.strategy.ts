import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStratey extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKey: process.env.JWT_SALT,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: any) {
        return {
            id: payload.sub,
            email: payload.email
        }
    }
}