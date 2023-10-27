import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FeelType } from '../../constants/feel-type.enum';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('feels')
export class Feel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post_id: number;

    @Column({ type: 'int2' })
    type: FeelType;

    @Column()
    user_id: number;

    @ManyToOne(() => Post, (post) => post.feels, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    constructor(props: Partial<Feel>) {
        super();
        Object.assign(this, props);
    }
}
