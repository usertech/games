import { Module } from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { ConfigModule } from './modules/config/config.module';
import { CallModule } from './modules/call/call.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    CallModule,
    GameModule,
    TypeOrmModule.forRoot({
      type: 'sqljs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
