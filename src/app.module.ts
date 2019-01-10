import { Module, DynamicModule } from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { ConfigModule } from './modules/config/config.module';
import { CallModule } from './modules/call/call.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'modules/config/config.service';

@Module({})
export class AppModule {
  static forRoot(config: ConfigService): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule,
        CallModule,
        GameModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          username: config.postgresUsername,
          password: config.postgresPassword,
          database: config.postgresDatabase,
          host: config.postgresHost,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      ],
      controllers: [],
      providers: [],
    };
  }
}
