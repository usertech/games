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
  public async getGames(searchName: string): Promise<ICheapSharkResponse[]> {
    const gamesList = await this.fetchGameInfo(searchName);
    return gamesList.data;
  }

  private async fetchGameInfo(serchName: string): Promise<AxiosResponse> {
    const res = await Axios.get(
      `${this.origin}/deals?storeID=1&desc=0&title=${encodeURIComponent(
        serchName,
      )}&pageSize=20`,
    );
    if (res.status === 200) {
      return res;
    }
    throw new Error('Error fetching games data');
  }
}
