import { ApiProperty } from '@nestjs/swagger/dist';

export class LoginDto {
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
} 