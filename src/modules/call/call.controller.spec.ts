import { Test, TestingModule } from '@nestjs/testing';
import { CallController } from './Call.controller';
import { CallService } from './Call.service';
import { ConfigService } from '../config/config.service';
import { Call } from './entities/call.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Call Controller', () => {
  let module: TestingModule;
  let controller: CallController;
  let callService: CallService;

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
    callService = module.get<CallService>(CallService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getCallsOnMonday only', () => {
    const getCallsOnMondaySpy = jest
      .spyOn(callService, 'getCallsOnMondays')
      .mockImplementation(() => []);
    controller.getCallInfo();
    expect(getCallsOnMondaySpy).toBeCalled();
  });
});
