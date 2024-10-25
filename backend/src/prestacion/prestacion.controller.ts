import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrestacionService } from './prestacion.service';
import { CreatePrestacionDto } from './dto/create-prestacion.dto';
import { UpdatePrestacionDto } from './dto/update-prestacion.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('prestacion')
@ApiTags("Prestación")
export class PrestacionController {
  constructor(private readonly prestacionService: PrestacionService) {}

  @Post()
  create(@Body() createPrestacionDto: CreatePrestacionDto) {
    return this.prestacionService.create(createPrestacionDto);
  }

  @Get()
  findAll() {
    return this.prestacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prestacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrestacionDto: UpdatePrestacionDto) {
    return this.prestacionService.update(+id, updatePrestacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestacionService.remove(+id);
  }
}
