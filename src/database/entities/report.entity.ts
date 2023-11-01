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
import { Post } from './post.entity';

@Entity('reports')
export class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'int' })
    postId: number;

    @Column({ type: 'varchar' })
    subject: string;

    @Column({ type: 'text' })
    details: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Post, (post) => post.reports, { onDelete: 'CASCADE' })
    post: Post;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    constructor(props: Partial<Report>) {
        super();
        Object.assign(this, props);
    }
}
