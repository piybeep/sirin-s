import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from '../../users/entities/users.entity';

@Entity('sessions')
export class Sessions {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", nullable: true })
    refresh_token: string

    @Column({ type: "varchar", nullable: false })
    expiresIn: string

    @Column({ type: "int", nullable: false })
    user_id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Users, (user) => user.sessions)
    @JoinColumn({ name: "user_id" })
    user: Users
}
