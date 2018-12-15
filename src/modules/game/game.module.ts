import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { CallService } from '../call/call.service';
import { DatabaseModule } from '../../database/database.module';
import { callsProviders } from '../call/call.providers';

@Module({
  imports: [DatabaseModule],
  providers: [GameService, CallService, ...callsProviders],
  controllers: [GameController],
})
export class GameModule {
}
