import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsPositive, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  vacancy?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  photo_id?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  text?: string;
}
