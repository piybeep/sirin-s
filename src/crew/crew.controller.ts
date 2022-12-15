import { Controller, Get, Param, } from '@nestjs/common';
import { CrewService } from './crew.service';

@Controller('crew')
export class CrewController {
  constructor(private readonly crewService: CrewService) { }

  @Get()
  findAll() {
    return this.crewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crewService.findOne(+id);
  }
}
