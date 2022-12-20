import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname_applicant: string

    @Column()
    fullname_student: string

    @Column()
    age_student: number

    @Column()
    contact: string

    @Column()
    place: string
}
