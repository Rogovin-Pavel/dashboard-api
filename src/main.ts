import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';

const bootstrap = () => {
  const logger = new LoggerService();
  const usersController = new UsersController(logger);

  const app = new App(logger, usersController);

  app.init();
};

bootstrap();
