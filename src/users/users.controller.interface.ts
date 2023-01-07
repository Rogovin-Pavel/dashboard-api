import { Request, Response, NextFunction } from 'express';

export interface IUsersController {
  login(_: Request, res: Response, next: NextFunction): void;
  register(_: Request, res: Response, next: NextFunction): void;
}
