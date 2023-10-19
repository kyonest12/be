import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { PostImage } from './post-image.entity';
import { PostVideo } from './post-video.entity';
import { Mark } from './mark.entity';
import { Feel } from './feel.entity';

@Entity('posts')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author_id: number;

    @Column({ type: 'text', nullable: true })
    descriptions: string;

    @Column({ type: 'int', default: 0 })
    edited: number;

    @Column({ nullable: true })
    category_id: number;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: User;

    @ManyToOne(() => Category, (category) => category.posts, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => PostImage, (image) => image.post, { cascade: true })
    images: PostImage[];

    @OneToOne(() => PostVideo, (video) => video.post, { cascade: true })
    video: PostVideo;

    @OneToMany(() => Feel, (feel) => feel.post)
    feels: Feel[];

    @OneToMany(() => Mark, (mark) => mark.post)
    marks: Mark[];

    constructor(props: Partial<Post>) {
        super();
        Object.assign(this, props);
    }
}
