import { PartialType } from '@nestjs/swagger';
import { CreateAnalyteDto } from './create-analyte.dto';

export class UpdateAnalyteDto extends PartialType(CreateAnalyteDto) {}
