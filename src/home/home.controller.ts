import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { UpdateHomeDto } from './dto/update-home.dto';
import { AccessTokenGuard } from '../sessions/guards/access-token.guard';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Данные на главной странице')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  findAll() {
    return this.homeService.findAll();
  }

  @Put()
  @UseGuards(AccessTokenGuard)
  update(@Body() updateHomeDto: UpdateHomeDto) {
    return this.homeService.update(updateHomeDto);
  }
}
