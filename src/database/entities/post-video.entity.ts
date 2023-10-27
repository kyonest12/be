import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('post_videos')
export class PostVideo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post_id: number;

    @Column()
    url: string;

    @OneToOne(() => Post, (post) => post.video, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    constructor(props: Partial<PostVideo>) {
        super();
        Object.assign(this, props);
    }
}
