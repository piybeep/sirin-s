import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateCourseDto {
    @ApiProperty()
    fullname_applicant: string
    @ApiProperty()
    fullname_student: string
    @ApiProperty()
    age_student: number
    @ApiProperty()
    contact: string
    @ApiProperty()
    place: string
}
