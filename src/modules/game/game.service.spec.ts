import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { ConfigService } from '../config/config.service';
import axios from 'axios';

jest.mock('axios');

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
  it('should fetch game deals', () => {
    (axios.get as any).mockResolvedValue();
    service.getGames('grand theft autp');
  });
});
