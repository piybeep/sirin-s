import { ApiPropertyOptional } from '@nestjs/swagger/dist';
import { IsPositive, IsInt, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateNewsDto {
  @ApiPropertyOptional()
  @IsPositive()
  @IsInt()
  id?: number;

  @ApiPropertyOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional()
  @IsPositive()
  @IsInt()
  preview_image_id?: number;

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsArray()
  @Type(() => Number)
  images?: number[];
}
