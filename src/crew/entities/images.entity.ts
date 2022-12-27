import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Crew } from "./crew.entity";

@Entity('images')
export class Images {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    path: string

    //FIXME:saving photo and relations
    @Column()
    crew_id: number

    @ManyToOne(() => Crew, (crew) => crew.images)
    @JoinColumn({ name: 'crew_id', referencedColumnName: 'id' })
    crew: Crew

}