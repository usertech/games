import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ConfigService } from '../config/config.service';
import { CallService } from '../call/call.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Call } from '../call/entities/call.entity';

describe('Game Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        GameService,
        CallService,
        {
          provide: getRepositoryToken(Call),
          useValue: { find: () => [], create: () => {}, save: () => {} },
        },
        {
          provide: ConfigService,
          useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
        },
      ],
    }).compile();
  });
  it('should be defined', () => {
    const controller: GameController = module.get<GameController>(
      GameController,
    );
    expect(controller).toBeDefined();
  });
});
