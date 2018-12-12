import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { CallService } from '../call/call.service';

@Module({
  providers: [GameService, CallService],
  controllers: [GameController],
})
export class GameModule {}
