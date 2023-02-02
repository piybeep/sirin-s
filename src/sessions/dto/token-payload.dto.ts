import { ApiProperty } from '@nestjs/swagger/dist';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty()
  @IsString()
  email: string;
}
