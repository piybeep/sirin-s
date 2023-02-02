import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  email: string;
  
  @ApiProperty()
  @IsString()
  @Length(5, 14)
  password: string;
}
