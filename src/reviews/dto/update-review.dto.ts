import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  photo_id?: number | null;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  text?: string;
}
