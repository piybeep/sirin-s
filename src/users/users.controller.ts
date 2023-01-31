import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { LoginDto } from '../sessions/dto/login.dto';
// import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Post('/new')
  async create(@Body() userDto: LoginDto) {
    return await this.usersService.createUser(userDto);
  }
}
