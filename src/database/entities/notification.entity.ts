import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NotificationType } from '../../constants/notification-type.enum';
import { User } from './user.entity';
import { Post } from './post.entity';
import { Mark } from './mark.entity';
import { Feel } from './feel.entity';

@Entity('notifications')
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    targetId: number | null;

    @Column({ type: 'int', nullable: true })
    postId: number | null;

    @Column({ type: 'int', nullable: true })
    markId: number | null;

    @Column({ type: 'int', nullable: true })
    feelId: number | null;

    @Column({ type: 'int2' })
    type: NotificationType;

    @Column({ type: 'bool', default: false })
    read: boolean;

    @Column({ type: 'bool', default: false })
    action: boolean;

    @Column({ type: 'int' })
    userId: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    target: User | null;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    post: Post | null;

    @ManyToOne(() => Mark, { onDelete: 'CASCADE' })
    mark: Mark | null;

    @ManyToOne(() => Feel, { onDelete: 'CASCADE' })
    feel: Feel | null;

    constructor(props: Partial<Notification>) {
        super();
        Object.assign(this, props);
    }
}
