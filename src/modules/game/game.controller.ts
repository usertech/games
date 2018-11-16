import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { IGame } from './interfaces/game.interface';

@Controller('games')
export class GameController {

  constructor(
    private readonly gameService: GameService,
  ) {}

  @Get('/')
  async getGameInfo(): Promise<IGame[]> {
    try {
      return await this.gameService.getGames();
    } catch (e) {
      throw Error(e);
    }
  }
}
