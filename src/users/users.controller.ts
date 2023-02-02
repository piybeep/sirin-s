import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Delete, Put, Req /* Res */ } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessTokenGuard } from './../sessions/guards/access-token.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request /* Response */ } from 'express';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User })
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiResponse({ type: User, status: 200 })
  @Put()
  async update(@Req() req: Request) {
    const userDto: UpdateUserDto = req.body;
    const user: any = { ...req.user };
    if (!user) {
      throw new UnauthorizedException('1');
    }
    return await this.usersService.update(user.sub, userDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(AccessTokenGuard)
  @ApiResponse({ type: User, status: 200 })
  @Delete()
  async delete(@Body() email: string) {
    return await this.usersService.delete(email);
  }
}
