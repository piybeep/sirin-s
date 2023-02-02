import { ApiProperty } from '@nestjs/swagger/dist';
import { IsInt, IsString } from 'class-validator';
export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  fullname_applicant: string;

  @ApiProperty()
  @IsString()
  fullname_student: string;

  @ApiProperty()
  @IsInt()
  age_student: number;

  @ApiProperty()
  @IsString()
  contact: string;

  @ApiProperty()
  @IsString()
  place: string;
}
