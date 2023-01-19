import { ApiProperty } from '@nestjs/swagger';

export class CreateCrewDto {
    @ApiProperty()
    fullname: string
    @ApiProperty()
    vacancy: string
    @ApiProperty()
    sub_vacancy?: string
    @ApiProperty()
    photo_id: number
    @ApiProperty()
    education: string
    @ApiProperty()
    experience: string
    @ApiProperty()
    achievements?: string
    @ApiProperty()
    images?: [number]
}