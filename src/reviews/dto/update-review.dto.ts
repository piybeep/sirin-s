import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsPositive } from 'class-validator';

export class UpdateReviewDto {
  @ApiPropertyOptional()
  @IsString()
  fullname?: string;

  @ApiPropertyOptional()
  @IsString()
  vacancy?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  photo_id?: number;

  @ApiPropertyOptional()
  @IsString()
  text?: string;
}
