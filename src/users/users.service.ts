import { inject, injectable } from 'inversify';

import { User } from './user.entity';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { IConfigService } from '../config/config.service.interface';
import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UsersService implements IUsersService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {}
  async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    const newUser = new User(email, name);
    const salt = Number(this.configService.get('SALT'));
    await newUser.setPassword(password, salt);
    const existedUser = await this.usersRepository.find(email);
    if (existedUser) {
      return null;
    }

    return this.usersRepository.create(newUser);
  }

  async login({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.usersRepository.find(email);
    if (!existedUser) return false;

    const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
    const isValid = await newUser.validatePassword(password);

    return isValid;
  }
}
