import { Injectable } from '@nestjs/common';
import Axios, { AxiosResponse } from 'axios';
import { ICheapSharkResponse } from './interfaces/cheapSharkResponse.interface';

@Injectable()
export class GameService {

  /**
   * Returns list of games
   */
  public async getGames(): Promise<ICheapSharkResponse[]> {
    const gamesList = await this.fetchGameInfo();
    return gamesList.data;
  }

  private async fetchGameInfo(): Promise<AxiosResponse> {
    const res = await Axios.get('http://www.cheapshark.com/api/1.0/deals?storeID=1&desc=0&title=grand%20theft%20auto&pageSize=20');
    if (res.status === 200) {
      return res;
    }
    throw new Error('Error fetching games data');
  }
}
