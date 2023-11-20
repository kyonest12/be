import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('blocks')
export class Block extends BaseEntity {
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

    @ManyToOne(() => User, (user) => user.blocked, { onDelete: 'CASCADE' })
    target: User;

    @ManyToOne(() => User, (user) => user.blocking, { onDelete: 'CASCADE' })
    user: User;

    constructor(props: Partial<Block>) {
        super();
        Object.assign(this, props);
    }
}
