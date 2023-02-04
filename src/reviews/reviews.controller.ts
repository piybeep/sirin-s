import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common';
import {
  Body,
  Post,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common/decorators';
import { ReviewsService } from './reviews.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { CreateReviewDto } from './dto/create-review.dto';
import { Reviews } from './reviews.entity';
import { AccessTokenGuard } from './../sessions/guards/access-token.guard';

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

  @ApiOkResponse({
    type: Reviews,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put(':id')
  updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: Partial<CreateReviewDto>,
  ) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @ApiResponse({
    type: Reviews,
    status: 200,
  })
  @Get(':id')
  getOneReview(@Param('id') id: string) {
    if (!isNaN(+id)) return this.reviewsService.findOne(+id);
    else throw new BadRequestException();
  }

  @ApiOkResponse({
    type: Reviews,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    if (!isNaN(+id)) return this.reviewsService.delete(+id);
    else throw new BadRequestException();

  }
}
