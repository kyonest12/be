import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Mark } from './mark.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    markId: number;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'int' })
    posterId: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToOne(() => Mark, (mark) => mark.comments, { onDelete: 'CASCADE' })
    mark: Mark;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    poster: User;

    constructor(props: Partial<Comment>) {
        super();
        Object.assign(this, props);
    }
}
