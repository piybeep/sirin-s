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
import { Reviews } from '../reviews/reviews.entity';

@Entity('images')
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  type: string;

  @ManyToMany(() => Crew, (crew) => crew.images, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'crew_images' })
  crew: Crew[];

  @ManyToOne(() => Crew, (crew) => crew.photo, { onDelete: 'CASCADE' })
  crew_photo: Crew;

  @ManyToOne(() => Crew, (crew) => crew.banner, { onDelete: 'CASCADE' })
  crew_banner: Crew;

  @ManyToMany(() => News, (news) => news.images, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'news_images' })
  news: News[];

  @ManyToOne(() => News, (news) => news.pre_images, { onDelete: 'CASCADE' })
  pre_news: News;

  @ManyToOne(() => Reviews, (reviews) => reviews.photo, { onDelete: 'CASCADE' })
  reviews: Reviews;
}
