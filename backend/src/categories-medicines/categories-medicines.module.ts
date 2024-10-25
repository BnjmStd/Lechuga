import { Module } from '@nestjs/common';
import { CategoriesMedicinesService } from './categories-medicines.service';
import { CategoriesMedicinesController } from './categories-medicines.controller';

@Module({
  controllers: [CategoriesMedicinesController],
  providers: [CategoriesMedicinesService],
})
export class CategoriesMedicinesModule {}
