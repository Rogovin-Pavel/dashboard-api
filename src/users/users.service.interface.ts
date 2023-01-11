import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserModel } from '@prisma/client';

export interface IUsersService {
  login: (dto: UserLoginDto) => Promise<boolean>;
  createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
  getUserInfo: (email: string) => Promise<UserModel | null>;
}
