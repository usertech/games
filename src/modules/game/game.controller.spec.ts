import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ConfigService } from '../config/config.service';
import { CallService } from '../call/call.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Call } from '../call/entities/call.entity';

describe('Game Controller', () => {
  let module: TestingModule;
  let gameService: GameService;
  let callService: CallService;
  let controller: GameController;

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

    gameService = module.get<GameService>(GameService);
    callService = module.get<CallService>(CallService);
    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should call game service and log the call', async () => {
    const logCallSpy = jest
      .spyOn(callService, 'log')
      .mockImplementation(() => {});
    const getGamesSpy = jest
      .spyOn(gameService, 'getGames')
      .mockImplementation(() => {});
    const response = await controller.getGameInfo();
    expect(logCallSpy).toBeCalled();
    expect(getGamesSpy).toBeCalled();
  });
});
