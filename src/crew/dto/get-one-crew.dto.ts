import { Images } from '../entities/images.entity';
export class GetOneCrewDto {
    id: number | null
    fullname: string | null
    vacancy: string | null
    sub_vacancy?: string | null
    photo: string | null
    education: string | null
    experience: string | null
    achievements?: string | null
    images?: Array<Images> | null
} 