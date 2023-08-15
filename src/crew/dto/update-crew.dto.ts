import { ApiPropertyOptional } from '@nestjs/swagger';
import { Images } from '../../images/images.entity';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCrewDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  vacancy?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sub_vacancy?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  photo_id?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  banner_id?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  education?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  achievements?: string;

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsArray()
  @IsOptional()
  @Type(() => Number)
  images?: Images[];
}
