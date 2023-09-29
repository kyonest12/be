import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AccountStatus } from '../../constants/accountStatus.enum';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @Column({ nullable: true })
    token: string;

    @Column('int2', { default: AccountStatus.PENDING })
    status: AccountStatus;

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ default: 0 })
    coins: number;

    constructor(props: Partial<User>) {
        super();
        Object.assign(this, props);
    }

    toJSON() {
        return instanceToPlain(this);
    }
}
