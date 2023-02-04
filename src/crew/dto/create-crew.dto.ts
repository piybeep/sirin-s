import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateCrewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsString()
  vacancy: string;

  @ApiPropertyOptional()
  @IsString()
  sub_vacancy?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  photo_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  education: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  experience: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  achievements?: string;

  @ApiPropertyOptional({ isArray: true })
  @Type(() => Number)
  @IsArray()
  images?: number[];
}
