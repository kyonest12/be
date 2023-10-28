import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('post_images')
export class PostImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    postId: number;

    @Column({ type: 'varchar' })
    url: string;

    @ManyToOne(() => Post, (post) => post.images, { onDelete: 'CASCADE' })
    post: Post;

    constructor(props: Partial<PostImage>) {
        super();
        Object.assign(this, props);
    }
}
