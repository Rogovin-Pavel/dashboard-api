import { inject, injectable } from 'inversify';
import { config, DotenvConfigOutput } from 'dotenv';

import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from './config.service.interface';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvConfigOutput['parsed'];

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('[ConfigService] .env file read error');
    } else {
      this.logger.log('[ConfigService] .env Config is loaded');
      this.config = result.parsed;
    }
  }

  get(key: string): string {
    return this.config![key];
  }
}
