import { instanceToPlain } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { VerifyCodeStatus } from '../../constants/verify-code-status.enum';

@Entity('verify_codes')
export class VerifyCode extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    code: string;

    @Column('timestamptz')
    expired_at: Date;

    @Column('int2', { default: VerifyCodeStatus.ACTIVE })
    status: VerifyCodeStatus;

    @ManyToOne(() => User, (user) => user.verify_codes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    constructor(props: Partial<VerifyCode>) {
        super();
        Object.assign(this, props);
    }

    toJSON() {
        return instanceToPlain(this);
    }
}
