import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/shared';

@Entity({
    name: 'users',
})
export class UserEntity implements User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
        primary: true,
    })
    email: string;

    @Column('integer', {
        default: 0,
    })
    linksCount: number;

    @Column('text', {
        nullable: false,
    })
    name: string;

    @CreateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        update: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    updatedAt?: Date;
}
