import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mark } from './mark.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mark_id: number;

    @Column({ type: 'text' })
    content: string;

    @Column()
    poster_id: number;

    @ManyToOne(() => Mark, (mark) => mark.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'mark_id' })
    mark: Mark;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'poster_id' })
    poster: User;

    constructor(props: Partial<Comment>) {
        super();
        Object.assign(this, props);
    }
}
