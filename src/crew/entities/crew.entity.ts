import {
    Column,
    UpdateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { Images } from '../../images/images.entity';

@Entity('crew')
export class Crew {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    vacancy: string

    @Column({ nullable: true })
    sub_vacancy: string

    @Column()
    photo_id: number

    @Column()
    education: string

    @Column()
    experience: string

    @Column({ nullable: true })
    achievements: string

    @ManyToMany(() => Images, (images) => images.crew, { eager: true })
    @JoinTable({ name: "crew_images" })
    images: Images[]

    @OneToMany(() => Images, (images) => images.crew_photo, { eager: true })
    @JoinColumn({ name: "photo_id" })
    photo: Images
    @UpdateDateColumn()
    updatedAt: Date

}
