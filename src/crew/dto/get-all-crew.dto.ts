import { ApiProperty } from '@nestjs/swagger/dist';

export class GetAllCrewDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  vacancy: string;
  @ApiProperty()
  photo_id: number;
}
