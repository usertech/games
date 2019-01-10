import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { ConfigService } from '../config/config.service';
import * as nock from 'nock';
import { dealResponse } from './mocks/dealResponse.mock';
import { dealsResponse } from './mocks/dealsResponse.mock';
import { expectedResponse } from './mocks/expectedResponse.mock';

describe('GameService', () => {
  let service: GameService;
  let config: ConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: ConfigService,
          useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
        },
      ],
    }).compile();
    service = module.get<GameService>(GameService);
    config = module.get<ConfigService>(ConfigService);

    // intercept the API requests and pass our own responses
    nock(config.gamesApiOrigin)
      .get('/deals')
      .query({ storeID: 1, desc: 0, title: 'grand theft auto', pageSize: 20 })
      .reply(200, dealsResponse)
      .get('/deals')
      .query(({ id }) => !!id) // check that id query param is present
      .reply(200, dealResponse);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should fetch game deals', async () => {
    const res = await service.getGames('grand theft auto');
    expect(res).toMatchObject(expectedResponse);
  });
});
