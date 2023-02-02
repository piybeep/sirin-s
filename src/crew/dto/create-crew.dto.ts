import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator/types/decorator/decorators';

export class CreateCrewDto {
  @ApiProperty()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
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
