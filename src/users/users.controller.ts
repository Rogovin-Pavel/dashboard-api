import { ILogger } from '../logger/logger.interface';
import { HTTPError } from '../errors/http-error.class';
import { BaseController } from '../common/base.controller';

import { Request, Response, NextFunction } from 'express';

export class UsersController extends BaseController {
  constructor(logger: ILogger) {
    super(logger);
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

  private login = (_: Request, res: Response, next: NextFunction) => {
    // this.ok<string>(res, 'Login is successful');
    next(new HTTPError(401, 'Authorization error', 'login'));
  };

  private register = (_: Request, res: Response, next: NextFunction) => {
    this.ok<string>(res, 'Register is successful');
  };
}
