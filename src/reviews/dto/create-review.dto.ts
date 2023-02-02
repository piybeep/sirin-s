import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsPositive } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiPropertyOptional()
  @IsString()
  vacancy?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  photo_id?: number;

  @ApiProperty()
  @IsString()
  text: string;
}
