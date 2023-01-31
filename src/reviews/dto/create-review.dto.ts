import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  vacancy?: string;
  @ApiProperty()
  photo_id?: number;
  @ApiProperty()
  text: string;
}
