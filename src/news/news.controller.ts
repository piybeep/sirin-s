import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { ImagesService } from 'src/images/images.service';
import { join } from 'path';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService,
    private readonly imagesService: ImagesService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: "preview_image", maxCount: 1 },
      { name: 'images', maxCount: 100 }
    ]
  ))

  async create(
    @UploadedFiles()
    files: { preview_image: Express.Multer.File[], images?: Express.Multer.File[] },
    @Body()
    createNewsDto: CreateNewsDto
  ) {
    let _images: Array<any> = []
    if (files?.images) {
      for (let file of files.images) {
        _images.push({
          path: join(__dirname, 'static', file.originalname),
        })
      }
    }

    if (files.preview_image) {
      _images.push({ path: join(__dirname, 'static', files.preview_image[0].originalname) })
    }

    return await this.imagesService.create(_images)

    // this.newsService.create(createNewsDto);

  }

  @Get()
  findAll(@Query('start') start: number, @Query('count') count: number) {
    return this.newsService.findAll(start, count);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
