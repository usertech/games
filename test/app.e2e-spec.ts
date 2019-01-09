import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '../src/modules/config/config.service';
import { Call } from '../src/modules/call/entities/call.entity';
import { getRepositoryToken } from '../node_modules/@nestjs/typeorm';
import { Repository } from '../node_modules/typeorm';
import * as nock from 'nock';
import { ICheapSharkDealResponse } from '../src/modules/game/interfaces/cheapSharkDealResponse';
import { ICheapSharkDealsResponse } from '../src/modules/game/interfaces/cheapSharkDealsResponse.interface';
import { ConfigModule } from '../src/modules/config/config.module';
import { NestFactory } from '../node_modules/@nestjs/core';

describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let callRepository: Repository<Call>;
  let config: ConfigService;

  beforeAll(async () => {
    const configModule = await NestFactory.create(ConfigModule);
    const configService = configModule.get<ConfigService>(ConfigService);

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule.forRoot(configService)],
    }).compile();

    config = moduleFixture.get<ConfigService>(ConfigService);
    callRepository = moduleFixture.get<Repository<Call>>(
      getRepositoryToken(Call),
    );
    app = moduleFixture.createNestApplication();
    await app.init();

    // intercept the API requests and pass our own responses

    const dealsResponse: ICheapSharkDealsResponse[] = [
      {
        internalName: 'GRANDTHEFTAUTOSANANDREAS',
        title: 'Grand Theft Auto: San Andreas',
        metacriticLink: '/game/pc/grand-theft-auto-san-andreas',
        dealID: 'BT59YKlHx5ny1%2FUCkqnbipqaqc2220OepQ8CA%2FscD68%3D',
        storeID: '1',
        gameID: '114',
        salePrice: '14.99',
        normalPrice: '14.99',
        isOnSale: '0',
        savings: '0.000000',
        metacriticScore: '93',
        steamRatingText: 'Very Positive',
        steamRatingPercent: '88',
        steamRatingCount: '23957',
        steamAppID: '12120',
        releaseDate: 1118102400,
        lastChange: 1546542530,
        dealRating: '0.0',
        thumb:
          'https://steamcdn-a.akamaihd.net/steam/apps/12120/capsule_sm_120.jpg?t=1543431179',
      },
    ];
    const dealResponse: ICheapSharkDealResponse = {
      gameInfo: {
        storeID: '1',
        gameID: '114',
        name: 'Grand Theft Auto: San Andreas',
        steamAppID: '12120',
        salePrice: '14.99',
        retailPrice: '14.99',
        steamRatingText: 'Very Positive',
        steamRatingPercent: '88',
        steamRatingCount: '23957',
        metacriticScore: '93',
        metacriticLink: '/game/pc/grand-theft-auto-san-andreas',
        releaseDate: 1118102400,
        publisher: 'N/A',
        steamworks: '1',
        thumb:
          'https://steamcdn-a.akamaihd.net/steam/apps/12120/capsule_sm_120.jpg?t=1543431179',
      },
      cheaperStores: [
        {
          dealID: 'Tw6QuKrpKlCoe4hebLbEJPCjtSs0kK84RsxeDjiocHw%3D',
          storeID: '23',
          salePrice: '12.59',
          retailPrice: '14.99',
        },
      ],
      cheapestPrice: { price: '2.99', date: 1432315105 },
    };

    nock(config.gamesApiOrigin)
      .get('/deals')
      .query({ storeID: 1, desc: 0, title: 'grand theft auto', pageSize: 20 })
      .reply(200, dealsResponse)
      .get('/deals')
      .query(({ id }) => !!id) // check that id query param is present
      .reply(200, dealResponse);
  });

  it('/games (GET) (200)', async () => {
    const response = await request(app.getHttpServer()).get('/games');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      {
        name: 'Grand Theft Auto: San Andreas',
        cheapestPrice: 2.99,
        salePrice: 14.99,
        releaseDate: '2005-06-07T00:00:00.000Z',
      },
    ]);
  });

  it('/calls (GET) (403)', async () => {
    const response = await request(app.getHttpServer()).get('/calls');
    expect(response.status).toBe(403);
  });

  it('/calls (GET) (200)', async () => {
    const findSpy = jest.spyOn(callRepository, 'find');
    const response = await request(app.getHttpServer())
      .get('/calls')
      .set('Authorization', `Bearer ${config.authToken}`);
    expect(response.status).toBe(200);
    expect(findSpy).toBeCalledTimes(1);
  });

  afterAll(async () => {
    await app.close();
  });
});
