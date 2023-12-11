import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Home } from './entities/home.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HomeService {
  constructor(@InjectRepository(Home) private homeRepos: Repository<Home>) {}

  create(createHomeDto: CreateHomeDto) {
    const home = this.homeRepos.create(createHomeDto);
    return this.homeRepos.save(home);
  }

  findAll() {
    return this.homeRepos.find();
  }

  async update(updateHomeDto: UpdateHomeDto) {
    const existing = await this.findAll();
    if (existing.length == 0) {
      return await this.create(updateHomeDto);
    }

    await this.homeRepos.remove(existing);
    return await this.create({ ...existing[0], ...updateHomeDto });
  }
}
