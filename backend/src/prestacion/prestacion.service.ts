import { Injectable } from '@nestjs/common';
import { CreatePrestacionDto } from './dto/create-prestacion.dto';
import { UpdatePrestacionDto } from './dto/update-prestacion.dto';

@Injectable()
export class PrestacionService {
  create(createPrestacionDto: CreatePrestacionDto) {
    return 'This action adds a new prestacion';
  }

  findAll() {
    return `This action returns all prestacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prestacion`;
  }

  update(id: number, updatePrestacionDto: UpdatePrestacionDto) {
    return `This action updates a #${id} prestacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} prestacion`;
  }
}
