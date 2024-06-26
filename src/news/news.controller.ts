import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Put, Query, UseInterceptors } from '@nestjs/common/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { News } from 'src/news/entities/news.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { AccessTokenGuard } from '../sessions/guards/access-token.guard';

@ApiTags('news')
@Controller('/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'preview_image', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
  )
  @ApiOkResponse({ type: News })
  async create(
    @Body()
    createNewsDto: CreateNewsDto,
  ) {
    return await this.newsService.create(createNewsDto);
  }

  @ApiResponse({ status: 200 })
  @Get()
  async findAll(@Query('start') start: number, @Query('count') count: number) {
    const data: [News[], number] = await this.newsService.findAll(start, count);
    return { data: data[0], count: data[1] };
  }

  @ApiResponse({ status: 200, type: News })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiResponse({ status: 200, type: News })
  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateNewsDto: UpdateNewsDto,
  ) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: News })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
