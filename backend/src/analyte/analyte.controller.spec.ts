import { Test, TestingModule } from '@nestjs/testing';
import { AnalyteController } from './analyte.controller';
import { AnalyteService } from './analyte.service';

describe('AnalyteController', () => {
  let controller: AnalyteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyteController],
      providers: [AnalyteService],
    }).compile();

    controller = module.get<AnalyteController>(AnalyteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
