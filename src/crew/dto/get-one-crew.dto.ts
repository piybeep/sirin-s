import { Images } from '../../images/images.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist';

export class GetOneCrewDto {
  @ApiProperty()
  id: number | null;
  @ApiProperty()
  fullname: string | null;
  @ApiProperty()
  position?: number | null;
  @ApiProperty()
  vacancy: string | null;
  @ApiPropertyOptional()
  sub_vacancy?: string | null;
  @ApiProperty()
  photo_id: number | null;
  @ApiProperty()
  education: string | null;
  @ApiProperty()
  experience: string | null;
  @ApiPropertyOptional()
  achievements?: string | null;
  @ApiPropertyOptional()
  images?: Array<Images> | null;
}
