import { User } from './user.contract';

export type CreateUserDto = Pick<User, 'email' | 'password' | 'name'>;

export interface LoginUserDto {
  email: string;
  password: string;
}
