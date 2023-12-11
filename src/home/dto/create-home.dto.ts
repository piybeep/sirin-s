import { IsString, IsUrl } from 'class-validator';

export class CreateHomeDto {
  @IsString()
  @IsUrl()
  url_video: string;
}
