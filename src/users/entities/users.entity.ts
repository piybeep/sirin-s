import { Sessions } from '../../session/entities/session.entity';
import { PrimaryGeneratedColumn, Entity, OneToMany, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column({unique: true})
    email: string

    @Column()
    token: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Sessions, (sessions) => sessions.user)
    sessions: Sessions[]

}