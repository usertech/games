import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import { ICheapSharkDealsResponse } from './interfaces/cheapSharkDealsResponse.interface';
import { ConfigService } from '../config/config.service';
import { IGame } from './interfaces/game.interface';
import { ICheapSharkDealResponse } from './interfaces/cheapSharkDealResponse.interface';

enum stores {
  STEAM = 1,
}

@Injectable()
export class GameService {
  private readonly origin: string;

  constructor(config: ConfigService) {
    this.origin = config.gamesApiOrigin;
  }

  /**
   * Returns list of games
   */
  public async getGames(searchName: string): Promise<IGame[]> {
    const gamesList = await this.fetchGameDeals(searchName);
    const deals = gamesList;

    const requests = deals.map(async deal => {
      const dealInfo = await this.fetchDealInfo(
        decodeURIComponent(deal.dealID),
      );
      return {
        name: dealInfo.gameInfo.name,
        salePrice: Number(dealInfo.gameInfo.salePrice),
        cheapestPrice: Number(dealInfo.cheapestPrice.price),
        releaseDate: new Date(dealInfo.gameInfo.releaseDate * 1000),
      };
    });

    return await Promise.all(requests);
  }

  /**
   * Get detailed info on the deal, including cheapest price
   */
  private async fetchDealInfo(id: string): Promise<ICheapSharkDealResponse> {
    const res = await Axios.get(`${this.origin}/deals`, {
      params: {
        id,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
    throw new Error('Error fetching games data');
  }

  /**
   * Returns a list of deals
   */
  private async fetchGameDeals(
    searchName: string,
  ): Promise<ICheapSharkDealsResponse[]> {
    // note: I assumed the params were intentional so I left them as-is just tried
    // to make the code a bit prettier.
    const res = await Axios.get(`${this.origin}/deals`, {
      params: {
        storeID: stores.STEAM,
        desc: 0,
        title: searchName,
        pageSize: 20,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
    throw new Error('Error fetching games data');
  }
}
