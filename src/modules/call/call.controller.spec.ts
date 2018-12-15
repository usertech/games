import { Test } from '@nestjs/testing';
import { CallsController } from './call.controller';
import { CallService } from './call.service';

/* TODO learn more about testing, I know that it isn't hard*/
describe('CallController', () => {
  let callController: CallsController;
  let callService: CallService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CallsController],
      providers: [CallService],
    }).compile();

    callService = module.get<CallService>(CallService);
    callController = module.get<CallsController>(CallsController);
  });

  describe('findAll', () => {
    it('should return an object of call', async () => {
      const result = {_id: '5c11287853d098b44a0c4153', calledAt: '2018-09-01T20:09:14.000Z'};
      jest.spyOn(callService, 'findAll').mockImplementation(() => result);

      expect(await callController.findAll()).toBe(result);
    });
  });
});