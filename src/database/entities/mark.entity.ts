import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { MarkType } from '../../constants/mark-type.enum';

@Entity('marks')
export class Mark extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post_id: number;

    @Column({ type: 'text' })
    mark_content: string;

    @Column({ type: 'int2' }) // MarkType enum
    type_of_mark: MarkType;

    @Column()
    poster_id: number;

    @ManyToOne(() => Post, (post) => post.marks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'poster_id' })
    poster: User;

    @OneToMany(() => Comment, (comment) => comment.mark)
    comments: Comment[];

    constructor(props: Partial<Mark>) {
        super();
        Object.assign(this, props);
    }
}
