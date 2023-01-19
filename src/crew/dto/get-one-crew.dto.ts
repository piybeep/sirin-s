import { Images } from '../../images/images.entity';
import { ApiProperty } from '@nestjs/swagger/dist';

export class GetOneCrewDto {
  @ApiProperty()
  id: number | null;
  @ApiProperty()
  fullname: string | null;
  @ApiProperty()
  vacancy: string | null;
  @ApiProperty()
  sub_vacancy?: string | null;
  @ApiProperty()
  photo_id: number | null;
  @ApiProperty()
  education: string | null;
  @ApiProperty()
  experience: string | null;
  @ApiProperty()
  achievements?: string | null;
  @ApiProperty()
  images?: Array<Images> | null;
}
