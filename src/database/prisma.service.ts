import { inject, injectable } from 'inversify';
import { PrismaClient, UserModel } from '@prisma/client';

import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('[PrismaService] Application is connected to database');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('[PrismaService] Error connecting to database' + error.message);
      }
    }
  }

  async disconnect(): Promise<void> {
    try {
      this.client.$disconnect();
      this.logger.log('[PrismaService]Application is disconnected from database');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.log('[PrismaService]Error disconnecting from database');
      }
    }
  }
}
