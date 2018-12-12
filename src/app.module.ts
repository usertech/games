import { Module } from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { CallModule } from './modules/call/call.module';

@Module({
  imports: [GameModule, CallModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
