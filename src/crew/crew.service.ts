import { Crew } from './entities/crew.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { GetOneCrewDto } from './dto/get-one-crew.dto';
import { GetAllCrewDto } from './dto/get-all-crew.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CrewService {
  constructor(
    @InjectRepository(Crew)
    private readonly crewRepository: Repository<Crew>,
  ) { }

  async findAll(): Promise<GetAllCrewDto[]> {
    const crew = await this.crewRepository.find();
    const result = crew.map(el => {
      return {
        id: el.id,
        fullname: el.fullname,
        vacancy: el.vacancy,
        photo: el.photo
      }
    })
    return result
  }

  findOne(id: number): Promise<GetOneCrewDto | null> {
    return this.crewRepository.findOne({ where: { id }, relations: ['images'] })
  }
}
