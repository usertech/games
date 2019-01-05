import { Module } from '@nestjs/common';
import { GameModule } from 'modules/game/game.module';
import { ConfigModule } from 'modules/config/config.module';

@Module({
  imports: [GameModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
