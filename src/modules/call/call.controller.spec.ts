import { Test, TestingModule } from '@nestjs/testing';
import { CallController } from './call.controller';
import { CallService } from './call.service';

describe('Call Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CallController],
      providers: [CallService],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CallController = module.get<CallController>(
      CallController,
    );
    expect(controller).toBeDefined();
  });
});
