import { AuthResult, Login } from './auth.contract';
import { AuthenticateDto, CreateLoginDto } from './auth.dto';

export interface AuthService {
    autheticate(data: AuthenticateDto): Promise<AuthResult>;
    createLogin(data: CreateLoginDto): Promise<Login>;
}
