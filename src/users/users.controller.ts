import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { User } from './user.entity';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { HTTPError } from '../errors/http-error.class';
import { UserLoginDto } from './dto/user-login.dto';
import { IUsersService } from './users.service.interface';
import { BaseController } from '../common/base.controller';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUsersController } from './users.controller.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UsersService) private usersService: IUsersService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/login',
        method: 'post',
        func: this.login,
      },
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    next(new HTTPError(401, 'Authorization error', 'login'));
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const newUser = await this.usersService.createUser(body);

    if (!newUser) {
      return next(new HTTPError(422, 'User is already registered', 'register'));
    }

    this.ok(res, newUser);
  }
}
