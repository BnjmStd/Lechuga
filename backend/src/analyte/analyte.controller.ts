import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnalyteService } from './analyte.service';
import { CreateAnalyteDto } from './dto/create-analyte.dto';
import { UpdateAnalyteDto } from './dto/update-analyte.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('analyte')
@ApiTags('Analyte')
export class AnalyteController {
  constructor(private readonly analyteService: AnalyteService) {}

  @Post()
  create(@Body() createAnalyteDto: CreateAnalyteDto) {
    return this.analyteService.create(createAnalyteDto);
  }

  @Get()
  findAll() {
    return this.analyteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analyteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnalyteDto: UpdateAnalyteDto) {
    return this.analyteService.update(+id, updateAnalyteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analyteService.remove(+id);
  }
}
