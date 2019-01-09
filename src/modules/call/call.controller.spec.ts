import { Test, TestingModule } from '@nestjs/testing';
import { CallController } from './Call.controller';
import { CallService } from './Call.service';
import { ConfigService } from '../config/config.service';
import { Call } from './entities/call.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Call Controller', () => {
  let module: TestingModule;
  let controller: CallController;
  let callRepository: Repository<Call>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CallController],
      providers: [
        {
          provide: getRepositoryToken(Call),
          useValue: { find: () => [], create: () => {}, save: () => {} },
        },
        CallService,
        {
          provide: ConfigService,
          useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
        },
      ],
    }).compile();
    controller = module.get<CallController>(CallController);
    callRepository = module.get<Repository<Call>>(getRepositoryToken(Call));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
