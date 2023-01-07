import { injectable } from 'inversify';
import { Router, Response } from 'express';
import 'reflect-metadata';

import { ILogger } from '../logger/logger.interface';
import { IControllerRoute, ExpressReturnType } from './route.interface';

@injectable()
export abstract class BaseController {
  private logger: ILogger;
  private _router: Router;

  constructor(logger: ILogger) {
    this.logger = logger;
    this._router = Router();
  }

  public get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): ExpressReturnType {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): ExpressReturnType {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response): ExpressReturnType {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      const { method, path, func } = route;
      const handler = func.bind(this);

      this.logger.log(`${method}: ${path}`);
      this.router[method](path, handler);
    }
  }
}
