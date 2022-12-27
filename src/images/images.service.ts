import { Injectable } from '@nestjs/common';
import { Images } from './images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Images)
        private readonly imagesRepository: Repository<Images>) {
    }
    async create(_images: Images[] | Images) {
        if (_images instanceof Array<Images>)
            return await this.imagesRepository.save(_images)
            
    }
}
