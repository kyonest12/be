import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AccountStatus } from '../../constants/account-status.enum';

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

    constructor(props: Partial<User>) {
        super();
        Object.assign(this, props);
    }
}
