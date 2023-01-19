import { Injectable } from '@nestjs/common';
import { Images } from './images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImagesDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
  ) {}
  async create(images: Express.Multer.File[]) {
    const _images: CreateImagesDto[] = [];
    for (let i in images) {
      _images.push({
        filename: images[i].filename,
        type: images[i].mimetype.split('/')[1],
      });
    }
    return await this.imagesRepository.save(_images);
  }

  async getImage(id: number) {
    return await this.imagesRepository.findOne({
      select: ['id', 'filename', 'type'],
      where: { id },
    });
  }

  async deleteImage(id: number) {
    const image = await this.imagesRepository.findOneBy({ id });
    if (image) return await this.imagesRepository.remove(image);
  }
}
