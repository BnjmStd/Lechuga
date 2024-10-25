import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntidadService } from './entidad.service';
import { CreateEntidadDto } from './dto/create-entidad.dto';
import { UpdateEntidadDto } from './dto/update-entidad.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('entidad')
@ApiTags("Entidad")
export class EntidadController {
  constructor(private readonly entidadService: EntidadService) {}

  @Post()
  create(@Body() createEntidadDto: CreateEntidadDto) {
    return this.entidadService.create(createEntidadDto);
  }

  @Get()
  findAll() {
    return this.entidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntidadDto: UpdateEntidadDto) {
    return this.entidadService.update(+id, updateEntidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entidadService.remove(+id);
  }
}
