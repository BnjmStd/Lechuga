import { IsString } from 'class-validator';

export class CreateAdministradorDto {
  @IsString()
  department: string;
}
