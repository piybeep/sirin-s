import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsPositive, IsString } from 'class-validator';
import { Images } from './../../images/images.entity';
export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  preview_image_id?: number;

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsArray()
  @Type(() => Number)
  images?: Images[];
}
