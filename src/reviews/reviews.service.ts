import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reviews } from './reviews.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ImagesService } from '../images/images.service';
import { Images } from 'src/images/images.entity';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private readonly reviewRepository: Repository<Reviews>,
    private readonly imagesService: ImagesService,
  ) {}

  async find(start: number, count: number) {
    if (!start) start = 1;
    if (!count) count = 12;
    if (isNaN(start) || isNaN(count) || start <= 0 || count <= 0) {
      throw new BadRequestException(
        'parameters start and count must be an integer',
      );
    }
    return await this.reviewRepository.findAndCount({
      skip: start - 1,
      take: count,
    });
  }

  async create(review: CreateReviewDto) {
    let photo: Partial<Images> = {};
    if (review.photo_id) {
      const _photo: Images | null = await this.imagesService.getImage(
        review.photo_id,
      );
      if (_photo) {
        photo = _photo;
      }
    }
    return this.reviewRepository.save({
      fullname: review.fullname,
      vacancy: review.vacancy,
      photo: [photo],
      photo_id: photo.id || review.photo_id,
      text: review.text,
    });
  }

  async update(id: number, review: UpdateReviewDto) {
    const _review = await this.reviewRepository.findOneBy({ id });
    if (!_review) throw new NotFoundException('Нет такого отзыва');

    const payload = {
      id: id || _review.id,
      fullname: review.fullname || _review.fullname,
      text: review.text || _review.text,
      vacancy: review.vacancy || _review.vacancy,
    };
    const photo: Images[] = [];
    if (review.photo_id) {
      const _photo = await this.imagesService.getImage(review.photo_id);
      if (_photo) photo.push(_photo);
    } else {
      if (review.photo_id !== null) {
        const _photo_old = await this.imagesService.getImage(_review.photo_id);
        if (_photo_old) {
          photo.push(_photo_old);
        }
      }
    }
    const result = await this.reviewRepository.save({
      ...payload,
      photo: photo,
    });
    return { id: result.id };
  }

  async findOne(id: number) {
    return this.reviewRepository.findOneBy({ id });
  }

  async delete(id: number) {
    const _review = await this.reviewRepository.findOneBy({ id });
    if (_review) return this.reviewRepository.remove(_review);
    return null;
  }
}
