import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [CallService],
  controllers: [CallController],
})
export class CallModule {}
