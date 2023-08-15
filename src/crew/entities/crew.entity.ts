import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Images } from '../../images/images.entity';

@Entity('crew')
export class Crew {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  vacancy: string;

  @Column({ nullable: true })
  sub_vacancy: string;

  @Column()
  photo_id: number;

  @Column({ nullable: true })
  banner_id: number;

  @Column()
  education: string;

  @Column()
  experience: string;

  @Column({ nullable: true })
  achievements: string;

  @ManyToMany(() => Images, (images) => images.crew, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'crew_images' })
  images: Images[];

  @OneToMany(() => Images, (images) => images.crew_photo, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'photo_id' })
  photo: Images;

  @OneToMany(() => Images, (images) => images.crew_banner, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'banner_id' })
  banner: Images;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
