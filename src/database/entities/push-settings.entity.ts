import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('push_settings')
export class PushSettings extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'boolean', default: true })
    likeComment: boolean;

    @Column({ type: 'boolean', default: true })
    fromFriends: boolean;

    @Column({ type: 'boolean', default: true })
    friendRequests: boolean;

    @Column({ type: 'boolean', default: true })
    suggestedFriends: boolean;

    @Column({ type: 'boolean', default: true })
    birthdays: boolean;

    @Column({ type: 'boolean', default: true })
    videos: boolean;

    @Column({ type: 'boolean', default: true })
    reports: boolean;

    @Column({ type: 'boolean', default: true })
    soundOn: boolean;

    @Column({ type: 'boolean', default: true })
    notificationOn: boolean;

    @Column({ type: 'boolean', default: true })
    vibrationOn: boolean;

    @Column({ type: 'boolean', default: true })
    ledOn: boolean;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    constructor(props: Partial<PushSettings>) {
        super();
        Object.assign(this, props);
    }
}
