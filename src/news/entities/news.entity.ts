import {
import { ManyToMany } from 'typeorm';
import { Images } from './../../images/images.entity';
@Entity('news')
export class News {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: false, type: 'text' })
    text: string

    @Column({ nullable: true })
    preview_image_id: number

    @CreateDateColumn()
    createdAt: Date

    @ManyToMany(() => Images, (images) => images.news, { eager: true })
    images: Images[]

    @OneToMany(() => Images, (images) => images.pre_news, { eager: true })
    @JoinColumn({ name: 'preview_image_id' })
    pre_images: Images[]

}
