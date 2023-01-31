import { ApiPropertyOptional } from '@nestjs/swagger/dist';

export class UpdateNewsDto {
  @ApiPropertyOptional()
  id?: number;
  @ApiPropertyOptional()
  title?: string;
  @ApiPropertyOptional()
  text?: string;
  @ApiPropertyOptional()
  preview_image_id?: number;
  @ApiPropertyOptional({ isArray: true })
  images?: Array<number>;
}
