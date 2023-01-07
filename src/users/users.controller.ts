import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { HTTPError } from '../errors/http-error.class';
import { BaseController } from '../common/base.controller';
import { IUsersController } from './users.controller.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
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
      },
    ]);
  }

  login(_: Request, res: Response, next: NextFunction): void {
    // this.ok<string>(res, 'Login is successful');
    next(new HTTPError(401, 'Authorization error', 'login'));
  }

  register(_: Request, res: Response, next: NextFunction): void {
    this.ok<string>(res, 'Register is successful');
  }
}
