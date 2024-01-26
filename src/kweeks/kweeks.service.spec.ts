import { Test, TestingModule } from '@nestjs/testing';
import { KweeksService } from './kweeks.service';

describe('KweeksService', () => {
  let service: KweeksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KweeksService],
    }).compile();

    service = module.get<KweeksService>(KweeksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
