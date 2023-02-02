import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty } from 'class-validator';
export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  fullname_applicant: string;

  @ApiProperty()
  @IsNotEmpty()
  fullname_student: string;

  @ApiProperty()
  @IsNotEmpty()
  age_student: number;

  @ApiProperty()
  @IsNotEmpty()
  contact: string;

  @ApiProperty()
  @IsNotEmpty()
  place: string;
}
