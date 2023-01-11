import { Request, Response, NextFunction } from 'express';

export interface IUsersController {
  info(req: Request, res: Response, next: NextFunction): void;
  login(req: Request, res: Response, next: NextFunction): void;
  register(req: Request, res: Response, next: NextFunction): void;
}
