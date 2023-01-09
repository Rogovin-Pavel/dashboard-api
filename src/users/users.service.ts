import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';

import { injectable } from 'inversify';

@injectable()
export class UsersService implements IUsersService {
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    // validate user in db. user ? null : new user
    return newUser || null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
