import { Server } from 'http';
import express, { Express } from 'express';
import { ILogger } from './logger/logger.interface';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';

export class App {
  private app: Express;
  private port: number;
  private server: Server;
  private logger: ILogger;
  private usersController: UsersController;
  private exceptionFilter: ExceptionFilter;

  public constructor(logger: ILogger, usersController: UsersController, exceptionFilter: ExceptionFilter) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
    this.exceptionFilter = exceptionFilter;
  }

  private useRoutes() {
    this.app.use('/users', this.usersController.router);
  }

  private useExeptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сверер запущен на http://localhost:${this.port}`);
  }
}
