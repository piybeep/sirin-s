import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { Images } from './../../images/images.entity';
import { JoinTable } from 'typeorm';
@Entity('news')
export class News {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: false, type: 'text' })
    text: string

    @Column()
    preview_image: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToMany(() => Images)
    @JoinTable()
    images: Images[]
    
}
