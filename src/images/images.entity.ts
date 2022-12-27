import { News } from "src/news/entities/news.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Crew } from "../crew/entities/crew.entity";

@Entity('images')
export class Images {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    path: string

    //FIXME:saving photo and relations
    @Column({ nullable: true })
    crew_id: number

    @ManyToOne(() => Crew, (crew) => crew.images)
    @JoinColumn({ name: 'crew_id', referencedColumnName: 'id' })
    crew: Crew


}


//one crew memmber has main image and many other images, but images may belong to only one crew member

//one news page has preview image and many other images, but images may belongs to only one news page