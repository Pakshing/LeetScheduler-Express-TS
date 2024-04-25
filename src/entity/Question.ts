import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    Unique,
} from 'typeorm';
import { User } from './User';

@Entity('question')
@Unique(['title', 'owner'])
export class Question {
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

    @Column('text', { array: true, nullable: true })
    tags: string[];

    @ManyToOne(() => User)
    owner: User;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    date_created: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    last_completion: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    next_review: Date;
}