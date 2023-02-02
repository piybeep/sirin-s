import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiPropertyOptional()
  fullname?: string;
  @ApiPropertyOptional()
  vacancy?: string;
  @ApiPropertyOptional()
  photo_id?: number;
  @ApiPropertyOptional()
  text?: string;
}
