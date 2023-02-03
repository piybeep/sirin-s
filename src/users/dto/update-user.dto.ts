import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length, IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsStrongPassword({ minLength: 5 })
  password?: string;

  @ApiProperty()
  @IsString()
  @Length(5, 14)
  old_password: string;
}
