import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('post_histories')
export class PostHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    postId: number;

    @Column({ type: 'int' })
    oldPostId: number;

    @ManyToOne(() => Post, (post) => post.histories, { onDelete: 'CASCADE' })
    post: Post;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    oldPost: Post;

    constructor(props: Partial<PostHistory>) {
        super();
        Object.assign(this, props);
    }
}
