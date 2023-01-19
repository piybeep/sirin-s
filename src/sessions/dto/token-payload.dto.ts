import { ApiProperty } from '@nestjs/swagger/dist';

export class TokenDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
}
