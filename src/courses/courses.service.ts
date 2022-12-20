import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    const course = await this.courseRepository.insert(createCourseDto)
    return this.courseRepository.findOneBy(course.raw[0])
  }

  findAll(start: number, count: number) {
    if (!start) start = 1
    if (!count) count = 12
    if (isNaN(start) || isNaN(count) || start <= 0 || count <= 0) {
      throw new BadRequestException('parameters start and count must be an integer')
    }
    return this.courseRepository.findAndCount({ skip: start - 1, take: count })
  }
}
