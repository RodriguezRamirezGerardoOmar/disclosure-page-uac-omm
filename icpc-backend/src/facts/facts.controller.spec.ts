import { Test, TestingModule } from '@nestjs/testing';
import { FactsController } from './facts.controller';
import { FactsService } from './facts.service';

describe('FactsController', () => {
  let controller: FactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactsController],
      providers: [FactsService],
    }).compile();

    controller = module.get<FactsController>(FactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
