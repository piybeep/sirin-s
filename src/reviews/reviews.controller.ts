import { Controller, Get } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Get()
  getReviews(@Query('start') start: number, @Query('count') count: number) {
    return this.reviewsService.find(start, count)
  }
}
