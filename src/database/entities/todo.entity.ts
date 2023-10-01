import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('todos')
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    title: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({ default: false })
    done: boolean;

    @Column({ default: false })
    is_public: boolean;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @ManyToOne(() => User, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    constructor(props: Partial<Todo>) {
        super();
        Object.assign(this, props);
    }
}
