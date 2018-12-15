import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CallsController } from './call.controller';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { CallService } from './call.service';
import { callsProviders } from './call.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CallsController],
  providers: [
    CallService,
    ...callsProviders,
  ],
})
export class CallModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CallsController);
  }
}