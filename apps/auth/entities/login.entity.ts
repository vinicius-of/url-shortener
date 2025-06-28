import { Login } from '@app/shared';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'logins',
})
export class LoginEntity implements Login {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
        primary: true,
    })
    email: string;

    @Column({
        type: 'text',
    })
    @Exclude()
    password: string;
}
