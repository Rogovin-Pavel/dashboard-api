import { App } from './app';
import { LoggerService } from './logger/logger.service';

const bootstrap = () => {
  const logger = new LoggerService();
  const app = new App(logger);

  app.init();
};

bootstrap();
