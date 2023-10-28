import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('post_videos')
export class PostVideo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    postId: number;

    @Column({ type: 'varchar' })
    url: string;

    @OneToOne(() => Post, (post) => post.video, { onDelete: 'CASCADE' })
    post: Post;

    constructor(props: Partial<PostVideo>) {
        super();
        Object.assign(this, props);
    }
}
