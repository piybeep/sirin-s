import { Crew } from './entities/crew.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { GetOneCrewDto } from './dto/get-one-crew.dto';
import { GetAllCrewDto } from './dto/get-all-crew.dto';
import { Injectable } from '@nestjs/common';
import { CreateCrewDto } from './dto/create-crew.dto';
import { Images } from 'src/images/images.entity';
import { ImagesService } from './../images/images.service';

@Injectable()
export class CrewService {
  constructor(
    @InjectRepository(Crew)
    private readonly crewRepository: Repository<Crew>,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll(): Promise<GetAllCrewDto[]> {
    return await this.crewRepository.find({
      select: ['id', 'fullname', 'vacancy', 'photo'],
    });
  }

  findOne(id: number): Promise<GetOneCrewDto | null> {
    return this.crewRepository.findOneBy({ id });
  }

  async create(createCrewDto: CreateCrewDto) {
    let payload: any = { ...createCrewDto };
    if (createCrewDto.images) {
      let _images: Images[] = [];
      for (let i in createCrewDto.images) {
        let image: Images | null = await this.imagesService.getImage(
          createCrewDto.images[i],
        );
        if (image) _images.push(image);
      }
      delete payload.images;
      payload.images = _images;
    }
    if (createCrewDto.photo_id) {
      let photo: Images | null = await this.imagesService.getImage(
        createCrewDto.photo_id,
      );
      if (photo) payload.photo = [photo];
    }
    return await this.crewRepository.save(payload);
  }
}
