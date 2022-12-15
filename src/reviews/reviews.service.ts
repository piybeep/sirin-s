import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reviews } from './reviews.entity';

@Injectable()
export class ReviewsService {
    constructor(@InjectRepository(Reviews)
    private readonly reviewRepository: Repository<Reviews>) { }

    find(start: number, count: number) {
        if (start < 0 || count < 0){
            throw new BadRequestException('parameters start and count must be an integer')
        }
            return this.reviewRepository.findAndCount({ skip: start-1, take: count })
    }
}
