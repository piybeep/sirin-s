import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { MailService } from './../mail/mail.service';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('courses')
@Controller('/courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const course = await this.coursesService.create(createCourseDto);
    await this.mailService.sendNewApplicationMail(course);
    return { id: course?.id };
  }

  @Get()
  findAll(@Query('start') start: number, @Query('count') count: number) {
    return this.coursesService.findAll(start, count);
  }
}
