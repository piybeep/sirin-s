import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsPositive, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  vacancy?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  photo_id?: number;

  @ApiProperty()
  @IsString()
  text: string;
}
