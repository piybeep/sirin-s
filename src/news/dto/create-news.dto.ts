import { Images } from './../../images/images.entity';
export class CreateNewsDto {
    title: string
    text: string
    preview_image: string
    images: Images[]
}
