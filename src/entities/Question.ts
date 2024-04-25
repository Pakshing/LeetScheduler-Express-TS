import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    Unique,
    UpdateDateColumn,
    BaseEntity,
    JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('question')
@Unique(['title', 'owner'])
export class Question extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    url: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    category: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    difficulty: string;

    @Column('text', { array: true, default: '{}', nullable: true})
    tags: string[];

    @ManyToOne(() => User, user => user.questions,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    date_created: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    last_completion: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    review_date: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    last_updated: Date;
}