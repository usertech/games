import { Injectable } from '@nestjs/common';
import Axios, { AxiosResponse } from 'axios';
import { ICheapSharkResponse } from './interfaces/cheapSharkResponse.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GameService {
  private readonly origin: string;

  constructor(config: ConfigService) {
    this.origin = config.gamesApiOrigin;
  }

  /**
   * Returns list of games
   */
  public async getGames(): Promise<ICheapSharkResponse[]> {
    const gamesList = await this.fetchGameInfo();
    return gamesList.data;
  }

  private async fetchGameInfo(): Promise<AxiosResponse> {
    const res = await Axios.get(
      `${
        this.origin
      }/deals?storeID=1&desc=0&title=grand%20theft%20auto&pageSize=20`,
    );
    if (res.status === 200) {
      return res;
    }
    throw new Error('Error fetching games data');
  }
}
