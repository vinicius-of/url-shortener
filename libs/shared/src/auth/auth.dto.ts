import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
    MaxLength,
} from 'class-validator';
import { Login } from './auth.contract';

export class AuthenticateDto implements Login {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
    })
    @MaxLength(20)
    password: string;
}

export class ValidateUserDto implements Pick<Login, 'email'> {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class CreateLoginDto implements Login {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
    })
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}
