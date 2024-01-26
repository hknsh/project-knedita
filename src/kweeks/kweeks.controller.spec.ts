import { Test, TestingModule } from '@nestjs/testing';
import { KweeksController } from './kweeks.controller';
import { KweeksService } from './kweeks.service';

describe('KweeksController', () => {
  let controller: KweeksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KweeksController],
      providers: [KweeksService],
    }).compile();

    controller = module.get<KweeksController>(KweeksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
