import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist';
import { Images } from './../../images/images.entity';
export class CreateNewsDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  text: string;
  @ApiPropertyOptional()
  preview_image_id?: number;
  @ApiPropertyOptional()
  images?: Images[];
}
