import { Test, TestingModule } from '@nestjs/testing';
import { CallService } from './call.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';
import { Repository } from 'typeorm';

describe('CallService', () => {
  let service: CallService;
  let callRepository: Repository<Call>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallService,
        {
          provide: getRepositoryToken(Call),
          useValue: {
            find: () => [
              {
                id: '748637c2-5199-4ff4-866a-6fb14ec98d56',
                called_at: new Date('2019-01-09T08:21:00.000Z'),
              },
              {
                id: '748637c2-5199-4ff4-866a-6fb14ec98d57',
                called_at: new Date('2019-01-07T08:21:00.000Z'),
              },
            ],
            create: () => {},
            save: () => {},
          },
        },
      ],
    }).compile();
    service = module.get<CallService>(CallService);
    callRepository = module.get<Repository<Call>>(getRepositoryToken(Call));
  });

  it('should be defined', () => {
    expect(callRepository).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should log a new value', async () => {
    const createSpy = jest.spyOn(callRepository, 'create');
    const saveSpy = jest.spyOn(callRepository, 'save');
    await service.log();
    expect(createSpy).toBeCalledTimes(1);
    expect(saveSpy).toBeCalledTimes(1);
  });

  it('should return a list of all calls', async () => {
    const response = await service.getCalls();
    expect(response).toMatchObject([
      {
        id: '748637c2-5199-4ff4-866a-6fb14ec98d56',
        called_at: new Date('2019-01-09T08:21:00.000Z'),
      },
      {
        id: '748637c2-5199-4ff4-866a-6fb14ec98d57',
        called_at: new Date('2019-01-07T08:21:00.000Z'),
      },
    ]);
  });

  it('should return a list of all calls made on Monday', async () => {
    const response = await service.getCallsOnMondays();
    expect(response).toMatchObject([
      {
        id: '748637c2-5199-4ff4-866a-6fb14ec98d57',
        called_at: new Date('2019-01-07T08:21:00.000Z'),
      },
    ]);
  });
});
