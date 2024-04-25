import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    Unique,
    OneToMany,
} from 'typeorm';
import { Question } from './Question';

@Entity('user')
@Unique(['email','login_method'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_created: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    last_active: Date;

    @Column({ type: 'varchar', length: 255, default: 'LocalStorage' })
    login_method: string;

    @OneToMany(() => Question, question => question.owner,{onDelete: 'CASCADE'})
    questions: Question[];

}