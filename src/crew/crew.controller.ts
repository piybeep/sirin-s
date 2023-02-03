import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { CrewService } from './crew.service';
import { CreateCrewDto } from './dto/create-crew.dto';
import { AccessTokenGuard } from './../sessions/guards/access-token.guard';
import { Crew } from './entities/crew.entity';

@ApiTags('crew')
@Controller('/crew')
export class CrewController {
  constructor(private readonly crewService: CrewService) {}

  @ApiOkResponse({
    type: Crew,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.crewService.findAll();
  }

  @ApiOkResponse({ type: Crew })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crewService.findOne(+id);
  }

  @ApiOkResponse({ type: Crew })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createCrewDto: CreateCrewDto) {
    return this.crewService.create(createCrewDto);
  }
}
