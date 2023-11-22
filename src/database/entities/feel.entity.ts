import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { FeelType } from '../../constants/feel-type.enum';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('feels')
export class Feel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    postId: number;

    @Column({ type: 'int2' })
    type: FeelType;

    @Column({ type: 'bool', default: false })
    editable: boolean;

    @Column({ type: 'int' })
    userId: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToOne(() => Post, (post) => post.feels, { onDelete: 'CASCADE' })
    post: Post;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    constructor(props: Partial<Feel>) {
        super();
        Object.assign(this, props);
    }
}
