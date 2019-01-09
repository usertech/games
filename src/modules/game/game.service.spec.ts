import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { ConfigService } from '../config/config.service';

describe('GameService', () => {
  let service: GameService;
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
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
