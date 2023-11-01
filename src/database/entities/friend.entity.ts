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

@Entity('friends')
export class Friend extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    friendId: number;

    @Column({ type: 'int' })
    userId: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    friend: User;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    constructor(props: Partial<Friend>) {
        super();
        Object.assign(this, props);
    }
}
