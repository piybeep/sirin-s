import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateImagesDto {
    @ApiProperty()
    filename: string
    @ApiProperty()
    type: string
}
