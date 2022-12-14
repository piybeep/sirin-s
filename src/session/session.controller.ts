import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Req, Res } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { getConfigToken } from '@nestjs/config';

@Controller('sign')
export class SessionController {
  constructor(private readonly sessionService: SessionService,
    private readonly jwtService: JwtService) { }

  @Post()
  async login(
    @Body() createSessionDto: CreateSessionDto,
    @Res({ passthrough: true }) res: Response
  ) {
    // 1. Пользователь логинится в приложении, передавая логин/пароль
    // 2. Сервер проверят подлинность логина/пароля
    // 3. В случае удачи создает и записывает сессию в БД { userId, refreshToken, expiresIn}
    // 4. Создает access token
    // 5. Отправляет клиенту access и refresh token uuid (взятый из выше созданной сессии)
    // 6. Клиент сохраняет токены(access в памяти приложения, refresh сетится как кука автоматом)
    const user = await this.sessionService.validateUser(createSessionDto)
    const { access_token, refresh_token } = await this.sessionService.createSession(user)
    res.cookie('refresh_token', refresh_token, { httpOnly: true })
    return { access_token, account: { id: user.id, email: user.email } }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req: Request) {
    try {
      const cookie = req.cookies['refresh_token']
      const access_token = req.headers.authorization

      if (!access_token) throw new UnauthorizedException()

      const data = await this.jwtService.verifyAsync(access_token.split(' ')[1], { secret: process.env.JWT_SALT })
      if (!data) {
        throw new UnauthorizedException()
      }

      const user = await this.sessionService.findOne({ email: data['email'] })
      const { /* token, */ ...result } = user
      return result
    } catch (err) {
      throw new UnauthorizedException()
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token')

    return { message: "success" }
  }


}
