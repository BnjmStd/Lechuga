import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesMedicinesService } from './categories-medicines.service';
import { CreateCategoriesMedicineDto } from './dto/create-categories-medicine.dto';
import { UpdateCategoriesMedicineDto } from './dto/update-categories-medicine.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories-medicines')
@ApiTags("Categories Medicine")
export class CategoriesMedicinesController {
  constructor(private readonly categoriesMedicinesService: CategoriesMedicinesService) {}

  @Post()
  create(@Body() createCategoriesMedicineDto: CreateCategoriesMedicineDto) {
    return this.categoriesMedicinesService.create(createCategoriesMedicineDto);
  }

  @Get()
  findAll() {
    return this.categoriesMedicinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesMedicinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesMedicineDto: UpdateCategoriesMedicineDto) {
    return this.categoriesMedicinesService.update(+id, updateCategoriesMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesMedicinesService.remove(+id);
  }
}
