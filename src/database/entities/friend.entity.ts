import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('friends')
export class Friend extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    targetId: number;

    @Column({ type: 'int' })
    userId: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    target: User;

    @ManyToOne(() => User, (user) => user.friends, { onDelete: 'CASCADE' })
    user: User;

    constructor(props: Partial<Friend>) {
        super();
        Object.assign(this, props);
    }
}
