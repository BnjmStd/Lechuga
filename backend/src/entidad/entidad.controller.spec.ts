import { Test, TestingModule } from '@nestjs/testing';
import { EntidadController } from './entidad.controller';
import { EntidadService } from './entidad.service';

describe('EntidadController', () => {
  let controller: EntidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntidadController],
      providers: [EntidadService],
    }).compile();

    controller = module.get<EntidadController>(EntidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
