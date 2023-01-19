import { ApiProperty } from '@nestjs/swagger/dist';
import { Images } from './../../images/images.entity';
export class CreateNewsDto {
    @ApiProperty()
    title: string
    @ApiProperty()
    text: string
    @ApiProperty()
    preview_image_id!: number
    @ApiProperty()
    images!: Images[]
}
