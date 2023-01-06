import { TYPES } from './../types';
import { ILogger } from '../logger/logger.interface';
import { HTTPError } from './http-error.class';
import { IExceptionFilter } from './exception.filter.interface.js';

// import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
// import 'reflect-metadata';

export class ExceptionFilter implements IExceptionFilter {
  logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.ctx}] Ошибка ${err.code}: ${err.message}`);
      res.status(err.code).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
