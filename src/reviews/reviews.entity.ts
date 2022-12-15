import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reviews')
export class Reviews {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    vacancy: string

    //FIXME:saving photo and relations
    @Column()
    photo: string

    @Column({ type: "text" })
    text: string
}