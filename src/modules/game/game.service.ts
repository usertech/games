import { Injectable } from '@nestjs/common';
import Axios, { AxiosResponse } from 'axios';
import { IGame } from './interfaces/game.interface';
import { CallService } from '../call/call.service';
import { CreateCallDto } from '../call/dto/create-call.dto';

@Injectable()
export class GameService {

  constructor(private readonly callService: CallService) {
  }

  /**
   * Returns list of games
   * @TODO save all called at
   */
  public async getGames(): Promise<IGame[]> {
    const gamesList = await this.fetchGameInfo();
    const createCallDto = new CreateCallDto();
    createCallDto.calledAt = new Date();
    this.callService.create(createCallDto);
    return gamesList.data;
  }

  private async fetchGameInfo(): Promise<AxiosResponse> {
    const res = await Axios.get('http://www.cheapshark.com/api/1.0/deals?storeID=1&desc=0&sortBy=Price&pageSize=20');
    if (res.status === 200) {
      return res;
    }
    throw new Error('Error fetching games data');
  }
}
