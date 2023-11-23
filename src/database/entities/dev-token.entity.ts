import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { DevTokenType } from '../../constants/dev-token-type.enum';
import { BaseEntity } from './base.entity';

@Entity('dev_tokens')
export class DevToken extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'int2' })
    type: DevTokenType;

    @Column({ type: 'varchar' })
    token: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    constructor(props: Partial<DevToken>) {
        super();
        Object.assign(this, props);
    }
}
