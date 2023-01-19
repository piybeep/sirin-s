import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { LoginDto } from '../sessions/dto/login.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('/new')
  async create(@Body() userDto: LoginDto) {
    return await this.usersService.createUser(userDto);
  }
}
