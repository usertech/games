import { Module } from '@nestjs/common';
import { CallsController } from './call.controller';
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
export class CallModule {
}