import { Test, TestingModule } from '@nestjs/testing';
import { AnalyteService } from './analyte.service';

describe('AnalyteService', () => {
  let service: AnalyteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyteService],
    }).compile();

    service = module.get<AnalyteService>(AnalyteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
