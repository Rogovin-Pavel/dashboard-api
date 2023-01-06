import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';

import { Request, Response } from 'express';

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

  private login = (_: Request, res: Response) => {
    this.ok<string>(res, 'Login is successful');
  };

  private register = (_: Request, res: Response) => {
    this.ok<string>(res, 'Register is successful');
  };
}
