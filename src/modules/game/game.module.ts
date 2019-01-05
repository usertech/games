import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
