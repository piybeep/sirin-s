import { Controller, Get } from '@nestjs/common';
import { Body, Post, Query } from '@nestjs/common/decorators';
import { ReviewsService } from './reviews.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateReviewDto } from './dto/create-review.dto';
import { Reviews } from './reviews.entity';

@ApiTags('reviews')
@Controller('/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOkResponse({
    type: Reviews,
    isArray: true,
  })
  @Get()
  getReviews(@Query('start') start: number, @Query('count') count: number) {
    return this.reviewsService.find(start, count);
  }
  @ApiOkResponse({
    type: Reviews,
  })
  @Post()
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }
}
