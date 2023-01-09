import { inject, injectable } from 'inversify';

import { User } from './user.entity';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { IConfigService } from '../config/config.service.interface';
import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';

@injectable()
export class UsersService implements IUsersService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    const salt = Number(this.configService.get('SALT'));
    await newUser.setPassword(password, salt);
    // validate user in db. user ? null : new user
    return newUser || null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
