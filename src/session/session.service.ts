import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateSessionDto } from './dto/create-session.dto';
import { UsersService } from './../users/users.service';
import { Repository } from 'typeorm';
import { Sessions } from './entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from "bcrypt"


@Injectable()
export class SessionService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(Sessions)
    private readonly sessionRepository: Repository<Sessions>
  ) { }

  async login(user: any) {
    const _user: Users | null = await this.userService.findOne(user.email)
    return {
      access_token: this.jwtService.sign({
        sub: _user?.id,
        email: _user?.email,
      }),
      user: {
        id: _user?.id,
        email: _user?.email
      }
    }
  }

  async validateUser(createSessionDto: CreateSessionDto) {
    const user = await this.userService.findOne(createSessionDto.email)

    if (!user) throw new BadRequestException('No such user')
    const salt = bcrypt.genSaltSync()

    if (!(bcrypt.compareSync(createSessionDto.password, user.token)))
      throw new BadRequestException('Invalid password')
    return user
  }

  async findOne(payload: any) {
    const user = await this.userService.findOne(payload.email)
    return user
  }

  async createSession(user: any) {
    const payload = { user_id: user.id, email: user.email, expiresIn: '1 minute' }
    const access_token = this.jwtService.sign(payload, {secret: process.env.JWT_SALT})
    const refresh_token = bcrypt.hashSync(access_token, bcrypt.genSaltSync())
    const session = this.sessionRepository.insert({
      refresh_token,
      expiresIn: payload.expiresIn,
      user_id: payload.user_id
    })
    return { access_token, refresh_token }
  }
  async logout() {

  }
}
