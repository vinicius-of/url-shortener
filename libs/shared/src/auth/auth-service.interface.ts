import { AuthResult, Login, SignInData } from './auth.contract';
import { AuthenticateDto, CreateLoginDto, ValidateUserDto } from './auth.dto';

export interface AuthService {
    autheticate(data: AuthenticateDto): Promise<AuthResult>;
    createLogin(data: CreateLoginDto): Promise<Login>;
}
