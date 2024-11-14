import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsInt, Min, Matches, MaxLength, IsOptional } from 'class-validator';

export class SignupDto {
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
        example: 'StrongPassword123!',
        description: 'User password. It must contain at least 8 characters, including uppercase and lowercase letters, numbers and symbols.',
        required: true,
        minLength: 8,
    })
    @IsString({ message: 'Password must be a text string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(20, { message: 'The password must not be longer than 20 characters' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'The password must contain at least one uppercase letter, one lowercase letter, one number and one symbol.' })
    @IsNotEmpty({ message: 'Password must not be empty' })
    password: string;

    @ApiProperty({
        example: 'StrongPassword123!',
        description: 'Confirmation of the password, it must match the "password" field.',
        required: true,
        minLength: 8,
    })
    @IsString({ message: 'Password confirmation must be a text string' })
    @MinLength(8, { message: 'Password confirmation must be at least 8 characters long' })
    @MaxLength(20, { message: 'Password confirmation must be no more than 20 characters' })
    @IsNotEmpty({ message: 'Password confirmation must not be empty' })
    passwordConfirm: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'Full name of the user.',
        required: false,
        minLength: 2,
    })
    @IsString({ message: 'The name must be a text string' })
    @MinLength(2, { message: 'The name must be at least 2 characters long' })
    @MaxLength(50, { message: 'The name must not be more than 50 characters.' })
    @IsOptional()
    name: string;

    @ApiProperty({
        example: 25,
        description: 'User age. Must be a number greater than or equal to 18.',
        required: true,
        minimum: 18,
    })
    @IsInt({ message: 'Age must be an integer' })
    @Min(18, { message: 'Age must be greater than or equal to 18' })
    @IsNotEmpty({ message: 'Age should not be empty' })
    age: number;
}
