import { CreateUserDto, LoginUserDto } from './user.dto';

export interface UserService {
  create(data: CreateUserDto): Promise<boolean>;
  login(data: LoginUserDto): Promise<unknown>;
}
