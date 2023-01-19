import { Module } from '@nestjs/common';
import { CrewService } from './crew.service';
import { CrewController } from './crew.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crew } from './entities/crew.entity';
import { ImagesModule } from './../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Crew]), ImagesModule],
  controllers: [CrewController],
  providers: [CrewService],
})
export class CrewModule {}
