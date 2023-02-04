import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length, IsEmail, IsStrongPassword, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsStrongPassword({ minLength: 5 })
  password?: string;

  @ApiProperty()
  @IsString()
  @Length(5, 14)
  old_password: string;
}
