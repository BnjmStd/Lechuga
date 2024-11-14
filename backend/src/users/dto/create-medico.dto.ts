import { IsString } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  specialty: string;
}
