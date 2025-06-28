import { ShortUrl } from '@app/shared';
import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({
    name: 'urls',
    orderBy: {
        clicks: 'DESC',
    },
})
export class ShortUrlEntity implements ShortUrl {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
        primary: true,
    })
    shortUrl: string;

    @Column('text')
    fullUrl: string;

    @Column('integer', {
        default: 0,
    })
    clicks: number;

    @Column('text', {
        nullable: true,
        default: null,
    })
    userId?: string;

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

    @DeleteDateColumn({
        type: 'datetime',
        nullable: true,
        select: false,
    })
    @Exclude()
    removedAt?: Date;
}
