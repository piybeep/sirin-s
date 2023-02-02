import { ApiProperty } from '@nestjs/swagger/dist';
import { IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(5, 18)
  password: string;
}
