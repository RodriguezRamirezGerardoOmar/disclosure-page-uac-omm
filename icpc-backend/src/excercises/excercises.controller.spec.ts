import { Test, TestingModule } from '@nestjs/testing';
import { ExcercisesController } from './excercises.controller';
import { ExcercisesService } from './excercises.service';

describe('ExcercisesController', () => {
  let controller: ExcercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcercisesController],
      providers: [ExcercisesService],
    }).compile();

    controller = module.get<ExcercisesController>(ExcercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
