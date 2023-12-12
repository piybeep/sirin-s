import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCrewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  position: number;

  @ApiProperty()
  @IsString()
  vacancy: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sub_vacancy?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  photo_id: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  banner_id?: number;

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
  @IsOptional()
  achievements?: string;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @Type(() => Number)
  @IsArray()
  images?: number[];
}
