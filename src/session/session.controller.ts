import { Controller, Request, Get, Post, Body, Patch, Param, UseGuards, Delete, UnauthorizedException } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateUserInput } from './../users/dto/create-user.input';
import { UsersService } from './../users/users.service';
import { JwtAuthGuard } from './strategies/jwt_auth.guard';
import { LocalAuthGuard } from 'src/session/strategies/local-auth.guard';

@Controller('sign')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post()
  async signin(@Request() req: any) {
      return req.user
    // const valid_user = this.sessionService.validateUser(user)
    // return this.sessionService.generateToken(valid_user)
  }


  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Request() req: any) {    
    return req.user
  }

  @Post("/up")
  async signup(@Body() user: CreateUserInput) {
    return await this.usersService.createUser(user)

  }
}
