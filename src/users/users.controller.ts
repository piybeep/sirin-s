import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateSessionDto } from './../session/dto/create-session.dto';
import { Body, Post } from '@nestjs/common/decorators';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async createUser(@Body() user: CreateUserInput) {
    const _user = await this.usersService.createUser(user)
    return _user
  }
}
