import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Repository } from 'typeorm';
import { Sessions } from './entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt"
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Sessions)
    private readonly sessionRepository: Repository<Sessions>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(dto: AuthDto) {
    const user = await this.usersService.findOneBy({ email: dto.email })

    if (!user) throw new BadRequestException('No such user')
    if (!(await bcrypt.compare(dto.password, user.token))) throw new UnauthorizedException('invalid password')

    const { token, ...result } = user
    return result
  }

  async signin(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }, { secret: process.env.JWT_SALT })
    }
  }
}
