import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('categories')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ type: 'boolean', default: false })
    has_name: boolean;

    @OneToMany(() => Post, (post) => post.category)
    posts: Post[];

    constructor(props: Partial<Category>) {
        super();
        Object.assign(this, props);
    }
}
