import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reviews } from './reviews.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ImagesService } from './../images/images.service';
import { Images } from 'src/images/images.entity';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private readonly reviewRepository: Repository<Reviews>,
    private readonly imagesService: ImagesService,
  ) {}

  find(start: number, count: number) {
    if (!start) start = 1;
    if (!count) count = 12;
    if (isNaN(start) || isNaN(count) || start <= 0 || count <= 0) {
      throw new BadRequestException(
        'parameters start and count must be an integer',
      );
    }
    return this.reviewRepository.findAndCount({ skip: start - 1, take: count });
  }

  async create(review: CreateReviewDto) {
    let photo: Partial<Images> = {};
    if (review.photo_id) {
      let _photo: Images | null = await this.imagesService.getImage(
        review.photo_id,
      );
      if (_photo) {
        photo = _photo;
      }
    }

    return this.reviewRepository.save({
      fulllname: review.fullname,
      vacancy: review.vacancy,
      photo,
      text: review.text,
    });
  }
  async update(id: number, review: UpdateReviewDto) {
    const _review = await this.reviewRepository.findOneBy({ id });
    if (!_review) throw new NotFoundException('Нет такого отзыва');
    const payload = {
      fulllname: review.fullname,
      vacancy: review.vacancy,
      text: review.text,
    };
    let photo: Images | null = null;
    if (review.photo_id) {
      const _photo = await this.imagesService.getImage(review.photo_id);
      if (_photo) photo = _photo;
    } else {
      const _photo_old = await this.imagesService.getImage(_review.photo_id);
      photo = _photo_old;
    }
    const result = await this.reviewRepository.save({
      ...payload,
      photo: photo || undefined,
    });
    return { id: result.id };
  }
}
