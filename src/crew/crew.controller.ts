import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CrewService } from './crew.service';
import { CreateCrewDto } from './dto/create-crew.dto';

@ApiTags('crew')
@Controller('/crew')
export class CrewController {
  constructor(private readonly crewService: CrewService) {}

  @Get()
  findAll() {
    return this.crewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crewService.findOne(+id);
  }

  @Post()
  create(@Body() createCrewDto: CreateCrewDto) {
    return this.crewService.create(createCrewDto);
  }
}
