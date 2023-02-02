import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCrewDto {
  @ApiProperty()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  vacancy: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  sub_vacancy?: string;
  
  @ApiProperty()
  @IsNumber()
  photo_id: number;

  @ApiProperty()
  @IsNotEmpty()
  education: string;

  @ApiProperty()
  @IsNotEmpty()
  experience: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  achievements?: string;

  @ApiPropertyOptional()
  @IsArray()
  images?: [number];

}
