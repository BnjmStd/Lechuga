import { Test, TestingModule } from '@nestjs/testing';
import { PrestacionService } from './prestacion.service';

describe('PrestacionService', () => {
  let service: PrestacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrestacionService],
    }).compile();

    service = module.get<PrestacionService>(PrestacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
