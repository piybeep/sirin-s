import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Images } from './../images/images.entity';

@Entity('reviews')
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ nullable: true })
  vacancy: string;

  @Column({ nullable: true })
  photo_id: number;

  @Column({ type: 'text' })
  text: string;

  @OneToMany(() => Images, (images) => images.reviews, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'photo_id' })
  photo: Images[];
}
