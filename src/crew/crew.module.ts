import { Module } from '@nestjs/common';
import { CrewService } from './crew.service';
import { CrewController } from './crew.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crew } from './entities/crew.entity';
import { Images } from '../images/images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Crew, Images])],
  controllers: [CrewController],
  providers: [CrewService],
})
export class CrewModule { }
