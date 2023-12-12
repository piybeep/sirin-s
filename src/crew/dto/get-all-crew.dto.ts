import { ApiProperty } from '@nestjs/swagger/dist';
import { Images } from '../../images/images.entity';

export class GetAllCrewDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  position: number;

  @ApiProperty()
  vacancy: string;

  @ApiProperty()
  photo: Images;
}
