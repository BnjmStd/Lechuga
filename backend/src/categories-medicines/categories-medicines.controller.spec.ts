import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesMedicinesController } from './categories-medicines.controller';
import { CategoriesMedicinesService } from './categories-medicines.service';

describe('CategoriesMedicinesController', () => {
  let controller: CategoriesMedicinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesMedicinesController],
      providers: [CategoriesMedicinesService],
    }).compile();

    controller = module.get<CategoriesMedicinesController>(CategoriesMedicinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
