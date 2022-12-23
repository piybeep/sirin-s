import { PrimaryGeneratedColumn, Entity, Column, OneToMany, UpdateDateColumn, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('sessions')
export class Sessions {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    refresh_token: string

    @Column()
    user_id: number

    @UpdateDateColumn()
    updatedAt: Date

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.session)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user: User[]
}