import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum contactsType {
  PHONE = 'phone',
  EMAIL = 'email',
}

@Entity('contacts')
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: contactsType })
  type: contactsType;

  @Column()
  data: string;
}
