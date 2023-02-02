import { ApiProperty } from '@nestjs/swagger/dist';
import { IsString } from 'class-validator';

export class CreateImagesDto {
  @ApiProperty()
  @IsString()
  filename: string;

  @ApiProperty()
  @IsString()
  type: string;
}
