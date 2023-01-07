import { Server } from 'http';
import { json } from 'body-parser';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { UsersController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';

@injectable()
export class App {
  private app: Express;
  private port: number;
  private server: Server;

  public constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UsersController) private usersController: UsersController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
  ) {
    this.app = express();
    this.port = 8000;
  }

  private useMiddleware(): void {
    this.app.use(json());
  }

  private useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  private useExeptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сверер запущен на http://localhost:${this.port}`);
  }
}
