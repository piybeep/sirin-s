import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum contactsType {
    PHONE="phone",
    EMAIL="email"
}

@Entity('contacts')
export class Contacts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: contactsType })
    type: contactsType

    @Column()
    data: string
}