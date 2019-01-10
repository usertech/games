import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Call])],
  providers: [CallService],
  controllers: [CallController],
})
export class CallModule {}
