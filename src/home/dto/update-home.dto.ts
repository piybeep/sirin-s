import { IsString, IsUrl } from 'class-validator';

export class UpdateHomeDto {
  @IsString()
  @IsUrl()
  url_video: string;
}
