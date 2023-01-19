import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Repository } from 'typeorm';
import { compare, hashSync, genSaltSync } from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { Sessions } from './entities/sessions.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Sessions)
    private readonly sessionRepository: Repository<Sessions>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneBy({ email: loginDto.email });

    if (!user) {
      throw new BadRequestException('Invalid login or password');
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid login or password');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.saveRefreshToken(tokens.refresh_token, user.id);
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

  async saveRefreshToken(
    refresh_token: string,
    user_id: number,
  ): Promise<void> {
    const hashed_refresh_token: string = this.hashData(refresh_token);
    const session = await this.sessionRepository.findOneBy({ user_id });
    if (!session) {
      await this.sessionRepository.save({
        refresh_token: hashed_refresh_token,
        user_id,
      });
    } else {
      await this.sessionRepository.update(
        { user_id },
        { refresh_token: hashed_refresh_token },
      );
    }
  }

  hashData(data: string) {
    const salt = genSaltSync(10);
    return hashSync(data, salt);
  }

  async logout(user: any) {
    return this.sessionRepository.update(
      { user_id: user.sub },
      { refresh_token: 'null' },
    );
  }

  async refreshTokens(user: any, refresh_token: string) {
    const session = await this.sessionRepository.findOneBy({
      user_id: user.sub,
    });
    if (!session || !session.refresh_token)
      throw new ForbiddenException('Access Denied');

    const refresh_token_matches = await compare(
      refresh_token,
      session.refresh_token,
    );
    if (!refresh_token_matches) throw new ForbiddenException('Access Denied');

    const _user = await this.usersService.findOneBy({ id: session.user_id });
    if (!_user) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(session.user_id, _user.email);
    await this.saveRefreshToken(tokens.refresh_token, _user.id);
    return { ...tokens, _user };
  }
}
