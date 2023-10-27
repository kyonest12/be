import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('post_images')
export class PostImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post_id: number;

    @Column()
    url: string;

    @ManyToOne(() => Post, (post) => post.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    constructor(props: Partial<PostImage>) {
        super();
        Object.assign(this, props);
    }
}
