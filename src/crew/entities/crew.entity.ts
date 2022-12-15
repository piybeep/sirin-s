import { Column, UpdateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Images } from './images.entity';

@Entity('crew')
export class Crew {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    fullname: string

    @Column({ nullable: false })
    vacancy: string

    @Column({ nullable: true })
    sub_vacancy: string

    @Column({ nullable: false })
    photo: string

    @Column()
    education: string

    @Column()
    experience: string

    @Column({ nullable: true })
    achievements: string

    @OneToMany(() => Images, (images) => images.crew, { eager: true })
    images: Images[]

    @UpdateDateColumn()
    updatedAt: Date

}
