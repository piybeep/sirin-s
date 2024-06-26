import { Crew } from './entities/crew.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { GetOneCrewDto } from './dto/get-one-crew.dto';
import { GetAllCrewDto } from './dto/get-all-crew.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCrewDto } from './dto/create-crew.dto';
import { Images } from 'src/images/images.entity';
import { ImagesService } from '../images/images.service';
import { UpdateCrewDto } from './dto/update-crew.dto';

@Injectable()
export class CrewService {
  constructor(
    @InjectRepository(Crew)
    private readonly crewRepository: Repository<Crew>,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll(): Promise<GetAllCrewDto[]> {
    return await this.crewRepository.find({
      select: ['id', 'fullname', 'vacancy', 'photo', 'position'],
      order: {
        position: 'asc',
      },
    });
  }

  findOne(id: number): Promise<GetOneCrewDto | null> {
    return this.crewRepository.findOneBy({ id });
  }

  async create(createCrewDto: CreateCrewDto) {
    const payload: any = { ...createCrewDto };
    if (createCrewDto.images) {
      const _images: Images[] = [];
      for (const i in createCrewDto.images) {
        const image: Images | null = await this.imagesService.getImage(
          createCrewDto.images[i],
        );
        if (image) _images.push(image);
      }
      delete payload.images;
      payload.images = _images;
    }
    if (createCrewDto.photo_id) {
      const photo: Images | null = await this.imagesService.getImage(
        createCrewDto.photo_id,
      );
      if (photo) payload.photo = [photo];
      else
        throw new HttpException(
          `Нет фотограии с id = ${createCrewDto.photo_id}`,
          400,
        );
    }
    if (createCrewDto.banner_id) {
      const photo: Images | null = await this.imagesService.getImage(
        createCrewDto.banner_id,
      );
      if (photo) payload.banner = [photo];
      else
        throw new HttpException(
          `Нет фотограии с id = ${createCrewDto.banner_id}`,
          400,
        );
    }
    return await this.crewRepository.save(payload);
  }

  async remove(id: number): Promise<HttpException | void> {
    if (isNaN(id)) throw new HttpException('id должен быть целым числом', 400);
    const crew_member: Crew | null = await this.crewRepository.findOneBy({
      id,
    });
    if (crew_member) {
      await this.crewRepository.remove(crew_member);
      return;
    } else {
      throw new HttpException(
        'Нет члена команды с таким id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, data: UpdateCrewDto): Promise<{ id: number }> {
    const member: Crew | null = await this.crewRepository.findOneBy({ id });

    if (!member)
      throw new HttpException(
        'Нет члена команды с таким id',
        HttpStatus.BAD_REQUEST,
      );

    const _images: Images[] = [];
    for (const i in data?.images) {
      const image: Images | null = await this.imagesService.getImage(
        +data.images[+i],
      );
      if (image) _images.push(image);
    }

    let payload = { ...data, images: _images, id };
    if (data.photo_id) {
      const photo: Images | null = await this.imagesService.getImage(
        data.photo_id,
      );
      if (photo) payload = Object.assign(payload, { photo: [photo] });
    }
    if (data.banner_id) {
      const photo: Images | null = await this.imagesService.getImage(
        data.banner_id,
      );
      if (photo) payload = Object.assign(payload, { banner: [photo] });
    }

    const result = await this.crewRepository.save(payload);
    return { id: result.id };
  }

  async updatePositions(data: { id: number; position: number }[]) {
    for (const item of data) {
      const crewMember = await this.findOne(item.id);
      if (!crewMember) continue;

      const positionTaken = await this.crewRepository.findOneBy({
        position: item.position,
      });
      if (positionTaken) {
        await this.crewRepository.update(positionTaken.id, {
          position: positionTaken.position + 100,
        });
      }

      await this.crewRepository.update(item.id, { position: item.position });

      if (positionTaken) {
        await this.crewRepository.update(positionTaken.id, {
          position: crewMember.position as number,
        });
      }
    }
    return this.findAll();
  }
}
