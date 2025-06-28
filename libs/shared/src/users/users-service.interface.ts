import { User } from './users.contract';
import { AddCountLinkDto, CreateUserDto, FindUserByEmailDto, FindUserByIdDto } from './users.dto';

export interface UsersService {
    createUser(data: CreateUserDto): Promise<User>;
    findUserByEmail(data: FindUserByEmailDto): Promise<User>;
    findUserById(data: FindUserByIdDto): Promise<User>;
    addCountLink(data: AddCountLinkDto): Promise<boolean>;
}
