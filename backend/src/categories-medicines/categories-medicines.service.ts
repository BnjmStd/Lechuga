import { Injectable } from '@nestjs/common';
import { CreateCategoriesMedicineDto } from './dto/create-categories-medicine.dto';
import { UpdateCategoriesMedicineDto } from './dto/update-categories-medicine.dto';

@Injectable()
export class CategoriesMedicinesService {
  create(createCategoriesMedicineDto: CreateCategoriesMedicineDto) {
    return 'This action adds a new categoriesMedicine';
  }

  findAll() {
    return `This action returns all categoriesMedicines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesMedicine`;
  }

  update(id: number, updateCategoriesMedicineDto: UpdateCategoriesMedicineDto) {
    return `This action updates a #${id} categoriesMedicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesMedicine`;
  }
}
