import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { LoginDto } from '../sessions/dto/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
// import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User })
  @Post('/new')
  async create(@Body() userDto: LoginDto) {
    return await this.usersService.createUser(userDto);
  }
}
