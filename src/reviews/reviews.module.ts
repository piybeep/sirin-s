import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from './reviews.entity';
import { ImagesModule } from './../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reviews]), ImagesModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
