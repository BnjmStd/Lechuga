import { PartialType } from '@nestjs/swagger';
import { CreatePrestacionDto } from './create-prestacion.dto';

export class UpdatePrestacionDto extends PartialType(CreatePrestacionDto) {}
