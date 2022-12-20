import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Body, Post } from '@nestjs/common/decorators';
import { CreateUserInput } from './dto/create-user.input';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async createUser(@Body() user: CreateUserInput) {
    return await this.usersService.createUser(user)
  }
}
