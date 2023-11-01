import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_info')
export class UserInfo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'varchar', nullable: true })
    coverImage: string | null;

    @Column({ type: 'varchar', nullable: true })
    address: string | null;

    @Column({ type: 'varchar', nullable: true })
    city: string | null;

    @Column({ type: 'varchar', nullable: true })
    country: string | null;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    constructor(props: Partial<UserInfo>) {
        super();
        Object.assign(this, props);
    }
}
