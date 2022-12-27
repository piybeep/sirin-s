import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from 'src/news/entities/news.entity';
import { Repository } from 'typeorm';
import { Images } from './../images/images.entity';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly imagesService: ImagesService) { }

  async create(createNewsDto: CreateNewsDto) {
      return await this.newsRepository.save(createNewsDto)
  }

  findAll(start: number, count: number) {
    if (!start) start = 1
    if (!count) count = 12
    if (isNaN(start) || isNaN(count) || start <= 0 || count <= 0) {
      throw new BadRequestException('parameters start and count must be an integer')
    }
    return this.newsRepository.findAndCount({ skip: start - 1, take: count, relations: { images: true } })
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
