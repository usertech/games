import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { CallService } from '../call/call.service';
import { Call } from '../call/interfaces/call.interface';
import { CallsController } from '../call/call.controller';

describe('Game Controller', () => {
  // let module: TestingModule;
  // beforeAll(async () => {
  //   module = await Test.createTestingModule({
  //     controllers: [GameController],
  //   }).compile();
  // });
  // it('should be defined', () => {
  //   const controller: GameController = module.get<GameController>(GameController);
  //   expect(controller).toBeDefined();
  // });

  let gameController: GameController;
  let gameService: GameService;
  let callService: CallService;

  beforeEach(() => {
    callService = new CallService(Call);
    gameService = new GameService(callService);
    gameController = new GameController(gameService);
  });
  describe('getGameInfo', () => {
    it('should return an array of game', async () => {
      const result = ['game'];
      jest.spyOn(gameService, 'getGames').mockImplementation(() => result);

      expect(await gameController.getGames()).toBe(result);
    });
  });
});
//
// describe('Game Controller', () => {
//   let app: TestingModule;
//
//   beforeAll(async () => {
//     app = await Test.createTestingModule({
//       controllers: [GameController],
//     }).compile();
//   });
//
//   describe('getGameInfo', () => {
//     it('should return "Hello World!"', () => {
//       const gameController = app.get<GameController>(GameController);
//       expect(gameController.findAll()).toEqual({
//         _id: '5c11287853d098b44a0c4153',
//         calledAt: '2018-09-01T20:09:14.000Z',
//       });
//     });
//   });
// });
