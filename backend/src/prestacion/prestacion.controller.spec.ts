import { Test, TestingModule } from '@nestjs/testing';
import { PrestacionController } from './prestacion.controller';
import { PrestacionService } from './prestacion.service';

describe('PrestacionController', () => {
  let controller: PrestacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrestacionController],
      providers: [PrestacionService],
    }).compile();

    controller = module.get<PrestacionController>(PrestacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
