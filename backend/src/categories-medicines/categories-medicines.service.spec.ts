import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesMedicinesService } from './categories-medicines.service';

describe('CategoriesMedicinesService', () => {
  let service: CategoriesMedicinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesMedicinesService],
    }).compile();

    service = module.get<CategoriesMedicinesService>(CategoriesMedicinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
