import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url_video: string;
}
