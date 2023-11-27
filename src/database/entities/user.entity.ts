import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AccountStatus } from '../../constants/account-status.enum';
import { Block } from './block.entity';
import { Friend } from './friend.entity';
import { BaseEntity } from './base.entity';
import { FriendRequest } from './friend-request.entity';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    token: string | null;

    @Column({ type: 'int2', default: AccountStatus.Pending })
    status: AccountStatus;

    @Column({ type: 'varchar', nullable: true })
    username: string | null;

    @Column({ type: 'varchar', nullable: true })
    avatar: string | null;

    @Column({ type: 'int', default: 0 })
    coins: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @OneToMany(() => Block, (block) => block.target)
    blocked: Block[];

    @OneToMany(() => Block, (block) => block.user)
    blocking: Block[];

    @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.target)
    friendRequested: FriendRequest[];

    @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.user)
    friendRequesting: FriendRequest[];

    @OneToMany(() => Friend, (friend) => friend.user)
    friends: Friend[];
    friendsCount: number;

    constructor(props: Partial<User>) {
        super();
        Object.assign(this, props);
    }
}
