import { Controller, Post, UseGuards, Get, Req, Res, Delete, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Request, Response } from 'express';
import { AccessTokenGuard } from './guards/access-token.guard';
import { JwtRefreshGuard } from './guards/refresh-token.guard';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('sign')
@Controller('/sign')
export class SessionsController {
    constructor(
        private readonly sessionsService: SessionsService,
    ) { }

    @Post()
    async login(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
        const { tokens, user } = await this.sessionsService.login(req.body)
        res.cookie('refresh_token', tokens.refresh_token, { maxAge: 7 * 24 * 60 * 60, httpOnly: true, secure: false })
        return {
            access_token: tokens.access_token, account: { id: user.id, email: user.email }
        }
    }
    @UseGuards(AccessTokenGuard)
    @Delete()
    logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        this.sessionsService.logout(req.user)
        res.clearCookie('refresh_token')
        return HttpStatus.OK
    }

    @UseGuards(JwtRefreshGuard)
    @Get('/refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const user = req.user

        if (!user) throw new UnauthorizedException('Access Denied')
        const old_refresh_token = req.cookies['refresh_token']
        const { access_token, refresh_token, _user } = await this.sessionsService.refreshTokens(user, old_refresh_token)
        res.cookie('refresh_token', refresh_token, { maxAge: 7 * 24 * 60 * 60, httpOnly: true, secure: false })
        return { access_token, account: { id: _user.id, email: _user.email } }
    }
}