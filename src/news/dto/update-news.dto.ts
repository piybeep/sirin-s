import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateNewsDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  title?: string
  @ApiProperty()
  text?: string
  @ApiProperty()
  preview_image_id?: number
  @ApiProperty()
  images?: Array<number> ;
}
