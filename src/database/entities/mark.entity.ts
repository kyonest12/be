import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { MarkType } from '../../constants/mark-type.enum';

@Entity('marks')
export class Mark extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    postId: number;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'int2' }) // MarkType enum
    type: MarkType;

    @Column({ type: 'bool', default: false })
    editable: boolean;

    @Column({ type: 'int' })
    userId: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToOne(() => Post, (post) => post.marks, { onDelete: 'CASCADE' })
    post: Post;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Comment, (comment) => comment.mark)
    comments: Comment[];

    constructor(props: Partial<Mark>) {
        super();
        Object.assign(this, props);
    }
}
