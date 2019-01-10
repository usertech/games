import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './Config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
        },
      ],
    }).compile();
    service = module.get<ConfigService>(ConfigService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should have correct `GAMES_API_ORIGIN` value', () => {
    expect(service.gamesApiOrigin).toBe('http://www.cheapshark.com/api/1.0');
  });
});
