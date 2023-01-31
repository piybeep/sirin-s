import { News } from 'src/news/entities/news.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Crew } from '../crew/entities/crew.entity';
import { Reviews } from './../reviews/reviews.entity';

@Entity('images')
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  type: string;

  @ManyToMany(() => Crew, (crew) => crew.images)
  @JoinTable({ name: 'crew_images' })
  crew: Crew[];

  @ManyToOne(() => Crew, (crew) => crew.photo)
  crew_photo: Crew;

  @ManyToMany(() => News, (news) => news.images)
  @JoinTable({ name: 'news_images' })
  news: News[];

  @ManyToOne(() => News, (news) => news.pre_images)
  pre_news: News;

  @ManyToOne(()=>Reviews, (reviews)=>reviews.photo)
  reviews: Reviews
}
