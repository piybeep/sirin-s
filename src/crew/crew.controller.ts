import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { CrewService } from './crew.service';
import { CreateCrewDto } from './dto/create-crew.dto';
import { GetAllCrewDto } from './dto/get-all-crew.dto';
import { AccessTokenGuard } from './../sessions/guards/access-token.guard';

@ApiTags('crew')
@Controller('/crew')
export class CrewController {
  constructor(private readonly crewService: CrewService) {}

  @ApiResponse({
    status: 200,
    description: 'получение всех членов команды',
    type: GetAllCrewDto,
  })
  @Get()
  findAll() {
    return this.crewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crewService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createCrewDto: CreateCrewDto) {
    return this.crewService.create(createCrewDto);
  }
}
