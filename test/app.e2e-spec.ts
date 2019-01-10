import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '../src/modules/config/config.service';
import * as nock from 'nock';
import { ConfigModule } from '../src/modules/config/config.module';
import { NestFactory } from '../node_modules/@nestjs/core';

import { dealResponse } from '../src/modules/game/mocks/dealResponse.mock';
import { dealsResponse } from '../src/modules/game/mocks/dealsResponse.mock';

describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let config: ConfigService;

  beforeAll(async () => {
    const configModule = await NestFactory.create(ConfigModule);
    const configService = configModule.get<ConfigService>(ConfigService);

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule.forRoot(configService)],
    }).compile();

    config = moduleFixture.get<ConfigService>(ConfigService);
    app = moduleFixture.createNestApplication();
    await app.init();

    // intercept the API requests and pass our own responses
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
    // Not testing that only monday calls are returned, would need to
    // change system/postgres time for that as it's used in postgres schema.
    // Covered in unit tests anyway.
    const response = await request(app.getHttpServer())
      .get('/calls')
      .set('Authorization', `Bearer ${config.authToken}`);
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
