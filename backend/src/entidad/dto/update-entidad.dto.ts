import { PartialType } from '@nestjs/swagger';
import { CreateEntidadDto } from './create-entidad.dto';

export class UpdateEntidadDto extends PartialType(CreateEntidadDto) {}
