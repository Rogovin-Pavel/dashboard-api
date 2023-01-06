import { Server } from 'http';
import express, { Express } from 'express';
import { usersRouter } from './users/users';
import { ILogger } from './logger/logger.interface';

export class App {
  private app: Express;
  private port: number;
  private server: Server;
  private logger: ILogger;

  public constructor(logger: ILogger) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
  }

  private useRoutes() {
    this.app.use('/users', usersRouter);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сверер запущен на http://localhost:${this.port}`);
  }
}
