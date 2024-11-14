import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsEnum, IsOptional } from 'class-validator';
import { CreatePacienteDto } from './create-paciente.dto'; 
import { CreateMedicoDto } from './create-medico.dto'; 
import { CreateAdministradorDto } from './create-administrador.dto'; 
import { UserType } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@email.com',
    description: 'Valid user email.',
    required: true,
    format: 'email',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  @MaxLength(50, { message: 'Email must not exceed 50 characters' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, { message: 'Email must be in a valid format' })
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'User phone number.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Phone number must be a text string' })
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Phone number must be in a valid format' })
  telephone?: string;

  @ApiProperty({
    example: 'John',
    description: 'Username.',
    required: true,
  })
  @IsString({ message: 'Name must be a text string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a text string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName?: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password required to log in.',
    required: true,
    minLength: 8,
  })
  @IsString({ message: 'Password must be a text string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'User role type.',
    required: true,
    enum: UserType,
  })
  @IsEnum(UserType, { message: 'User type must be a valid value' })
  @IsNotEmpty({ message: 'User type must not be empty' })
  userType: UserType;

  @ApiProperty({
    description: 'Patient data, if the user is a patient.',
    required: false,
  })
  @IsOptional()
  patient?: CreatePacienteDto;

  @ApiProperty({
    description: 'Doctor data, if the user is a doctor.',
    required: false,
  })
  @IsOptional()
  doctor?: CreateMedicoDto;

  @ApiProperty({
    description: 'Administrator data, if the user is an administrator.',
    required: false,
  })
  @IsOptional()
  admin?: CreateAdministradorDto;
}
