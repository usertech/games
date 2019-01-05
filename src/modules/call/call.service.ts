import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { ICall } from './interfaces/call.interface';

@Injectable()
export class CallService {
  private readonly origin: string;

  constructor(config: ConfigService) {
    this.origin = config.gamesApiOrigin;
  }

  /**
   * Returns list of calls
   */
  public async getCalls(): Promise<ICall[]> {
    return [
      {
        id: '123',
        called_at: new Date(),
      },
    ];
  }
}
