import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('searches')
export class Search extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'varchar' })
    keyword: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    constructor(props: Partial<Search>) {
        super();
        Object.assign(this, props);
    }
}
