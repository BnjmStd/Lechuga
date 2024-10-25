import { Injectable } from '@nestjs/common';
import { CreateAnalyteDto } from './dto/create-analyte.dto';
import { UpdateAnalyteDto } from './dto/update-analyte.dto';

@Injectable()
export class AnalyteService {
  create(createAnalyteDto: CreateAnalyteDto) {
    return 'This action adds a new analyte';
  }

  findAll() {
    return `This action returns all analyte`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analyte`;
  }

  update(id: number, updateAnalyteDto: UpdateAnalyteDto) {
    return `This action updates a #${id} analyte`;
  }

  remove(id: number) {
    return `This action removes a #${id} analyte`;
  }
}
