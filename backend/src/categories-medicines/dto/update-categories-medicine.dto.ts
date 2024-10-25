import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesMedicineDto } from './create-categories-medicine.dto';

export class UpdateCategoriesMedicineDto extends PartialType(CreateCategoriesMedicineDto) {}
