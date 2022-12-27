import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';

import { UsersService } from './users.service';
import { LoginDto } from '../sessions/dto/login.dto';
import { AccessTokenGuard } from '../sessions/guards/access-token.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  // @UseGuards(JwtAuthGuard)
  @Post('/new')
  async create(@Body() userDto: LoginDto) {
    return await this.usersService.createUser(userDto)
  }


}
