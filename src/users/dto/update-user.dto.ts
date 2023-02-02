import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(5, 14)
  password?: string;

  @ApiProperty()
  @IsString()
  @Length(5, 14)
  old_password: string;
}
