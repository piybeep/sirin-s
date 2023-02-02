import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from '../sessions/dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneBy(payload: object): Promise<User | null> {
    return await this.userRepository.findOneBy(payload);
  }

  async createUser(user: LoginDto) {
    const _user = this.userRepository.create(user);
    return await this.userRepository.save(_user);
  }

  async update(id: number, user: UpdateUserDto) {
    const _user = await this.userRepository.findOneBy({ id });
    if (!_user) {
      throw new UnauthorizedException('2');
    }
    const isPasswordCorrect = await compare(user.old_password, _user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('3');
    }

    _user.email = user.email ? user.email : _user.email;
    _user.password = user.password ? user.password : user.old_password;

    await this.userRepository.save(_user);
    return await this.userRepository.findOneBy({ id });
  }

  async delete(email: string) {
    const _user = await this.userRepository.findOneBy({ email });
    if (_user) {
      await this.userRepository.remove(_user);
    }
    return;
  }
}
