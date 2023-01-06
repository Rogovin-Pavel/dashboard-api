import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { ExceptionFilter } from './errors/exception.filter';
import { UsersController } from './users/users.controller';

const bootstrap = () => {
  const logger = new LoggerService();
  const exceptionFilter = new ExceptionFilter(logger);
  const usersController = new UsersController(logger);

  const app = new App(logger, usersController, exceptionFilter);

  app.init();
};

bootstrap();
