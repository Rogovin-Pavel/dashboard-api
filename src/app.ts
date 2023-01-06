import { Server } from 'http';
import express, { Express } from 'express';
import { ILogger } from './logger/logger.interface';
import { UsersController } from './users/users.controller';

export class App {
  private app: Express;
  private port: number;
  private server: Server;
  private logger: ILogger;
  usersController: UsersController;

  public constructor(logger: ILogger, usersController: UsersController) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
  }

  private useRoutes() {
    this.app.use('/users', this.usersController.router);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сверер запущен на http://localhost:${this.port}`);
  }
}
