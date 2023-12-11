import { Body, Controller, Get, Patch } from '@nestjs/common';
import { HomeService } from './home.service';
import { UpdateHomeDto } from './dto/update-home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  findAll() {
    return this.homeService.findAll();
  }

  @Patch()
  update(@Body() updateHomeDto: UpdateHomeDto) {
    return this.homeService.update(updateHomeDto);
  }
}
