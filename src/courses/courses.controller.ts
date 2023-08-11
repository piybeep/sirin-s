import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { MailService } from '../mail/mail.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { Course } from './entities/course.entity';

@ApiTags('courses')
@Controller('/courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly mailService: MailService,
  ) {}

  @ApiOkResponse({
    type: Course,
  })
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const course = await this.coursesService.create(createCourseDto);
    await this.mailService.sendNewApplicationMail(course);
    return course;
  }

  @ApiOkResponse({
    type: Course,
    isArray: true,
  })
  @Get()
  findAll(@Query('start') start: number, @Query('count') count: number) {
    return this.coursesService.findAll(start, count);
  }
}
