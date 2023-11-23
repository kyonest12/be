import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { BaseEntity } from './base.entity';

@Entity('categories')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    name: string | null;

    @Column({ type: 'boolean', default: false })
    hasName: boolean;

    @OneToMany(() => Post, (post) => post.category)
    posts: Post[];

    constructor(props: Partial<Category>) {
        super();
        Object.assign(this, props);
    }
}
