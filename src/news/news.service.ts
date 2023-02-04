import {
  Injectable,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
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
    private readonly imagesService: ImagesService,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    try {
      const _images: Images[] = [];
      for (const i in createNewsDto?.images) {
        const image: Images | null = await this.imagesService.getImage(
          +createNewsDto.images[+i],
        );
        if (image) _images.push(image);
      }
      const payload: Partial<News> = { ...createNewsDto, images: _images };
      if (createNewsDto.preview_image_id) {
        const pre_images: Images | null = await this.imagesService.getImage(
          createNewsDto.preview_image_id,
        );
        if (pre_images) {
          payload.pre_images = [pre_images];
        }
      }
      const newpage: News = await this.newsRepository.save(payload);
      return { id: newpage.id };
    } catch (e) {
      return e;
    }
  }

  findAll(start: number, count: number) {
    if (!start) start = 1;
    if (!count) count = 12;
    if (isNaN(start) || isNaN(count) || start <= 0 || count <= 0) {
      throw new BadRequestException(
        'параметры start и count должны быть положительными и целочисленными ',
      );
    }
    return this.newsRepository.findAndCount({
      skip: start - 1,
      take: count,
      order: { createdAt: 'DESC' },
      relations: { images: true },
    });
  }

  findOne(id: number) {
    return this.newsRepository.findOneBy({ id });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const newpage = await this.newsRepository.findOneBy({ id });
    if (!newpage) {
      throw new HttpException('Нет такой новости', HttpStatus.BAD_REQUEST);
    }

    const _images: Images[] = [];
    for (const i in updateNewsDto?.images) {
      const image: Images | null = await this.imagesService.getImage(
        +updateNewsDto.images[+i],
      );
      if (image) _images.push(image);
    }

    let payload = { ...updateNewsDto, images: _images, id };
    if (updateNewsDto.preview_image_id) {
      const preview_image: Images | null = await this.imagesService.getImage(
        updateNewsDto.preview_image_id,
      );
      if (preview_image)
        payload = Object.assign(payload, { pre_images: [preview_image] });
    }

    const result = await this.newsRepository.save(payload);
    return { id: result.id };
  }

  async remove(id: number) {
    const newpage: News | null = await this.newsRepository.findOneBy({ id });
    if (newpage) {
      await this.newsRepository.remove(newpage);
      return { id };
    }
    return newpage;
  }
}
