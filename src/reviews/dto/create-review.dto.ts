import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  fullname: string;
  @ApiPropertyOptional()
  vacancy?: string;
  @ApiPropertyOptional()
  photo_id?: number;
  @ApiProperty()
  text: string;
}
