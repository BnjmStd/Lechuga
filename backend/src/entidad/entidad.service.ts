import { Injectable } from '@nestjs/common';
import { CreateEntidadDto } from './dto/create-entidad.dto';
import { UpdateEntidadDto } from './dto/update-entidad.dto';

@Injectable()
export class EntidadService {
  create(createEntidadDto: CreateEntidadDto) {
    return 'This action adds a new entidad';
  }

  findAll() {
    return `This action returns all entidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entidad`;
  }

  update(id: number, updateEntidadDto: UpdateEntidadDto) {
    return `This action updates a #${id} entidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} entidad`;
  }
}
