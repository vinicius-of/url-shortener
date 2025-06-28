import { User } from './users.contract';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto implements Pick<User, 'email' | 'name'> {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}

export class FindUserByEmailDto implements Pick<User, 'email'> {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class AddCountLinkDto {
    @IsOptional()
    @IsUUID()
    id?: string;
}

export class FindUserByIdDto implements Pick<User, 'id'> {
    @IsUUID()
    id: string;
}
