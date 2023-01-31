import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCrewDto {
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  vacancy: string;
  @ApiPropertyOptional()
  sub_vacancy?: string;
  @ApiProperty()
  photo_id: number;
  @ApiProperty()
  education: string;
  @ApiProperty()
  experience: string;
  @ApiPropertyOptional()
  achievements?: string;
  @ApiPropertyOptional()
  images?: [number];
}
