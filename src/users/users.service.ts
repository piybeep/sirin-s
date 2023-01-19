import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from '../sessions/dto/login.dto';

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
}
