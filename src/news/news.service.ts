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
  ) { }

  async create(createNewsDto: CreateNewsDto) {
    try {
      let payload: Partial<News> = { ...createNewsDto }
      let pre_images: Images | null;
      if (createNewsDto.preview_image_id) {
        pre_images = await this.imagesService.getImage(createNewsDto.preview_image_id)
        if (pre_images) {
          payload.pre_images = [pre_images]
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
        'parameters start and count must be an integer',
      );
    }
    return this.newsRepository.findAndCount({
      skip: start - 1,
      take: count,
      relations: { images: true },
    });
  }

  findOne(id: number) {
    return this.newsRepository.findOneBy({ id });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const newpage = await this.newsRepository.findOneBy({ id });
    if (!newpage) {
      throw new HttpException('No such News', HttpStatus.BAD_REQUEST);
    }

    let _images: Images[] = [];
    for (let i in updateNewsDto?.images) {
      const image: Images | null = await this.imagesService.getImage(
        +updateNewsDto.images[+i],
      );
      if (image) _images.push(image);
    }

    let payload = { ...updateNewsDto, images: _images, id };
    let preview_image: Images | null;
    if (updateNewsDto.preview_image_id) {
      preview_image = await this.imagesService.getImage(
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
