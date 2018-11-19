import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('games')
export class GameController {

  constructor(
    private readonly gameService: GameService,
  ) {}

  @Get('/')
  async getGameInfo() {
    try {
      return await this.gameService.getGames();
    } catch (e) {
      throw Error(e);
    }
  }
}
