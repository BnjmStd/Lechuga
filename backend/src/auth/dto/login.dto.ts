import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, Matches } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'User email',
        required: true,
        example: 'example@email.com',
    })
    @IsEmail({}, { message: 'Email must be valid' })
    @IsNotEmpty({ message: 'Email must not be empty' })
    @MaxLength(50, { message: 'Email must not exceed 50 characters' })
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, { message: 'Email must be in a valid format' })
    email: string;

    /*
    
    ^: Indica el inicio de la cadena.
    [a-zA-Z0-9._%+-]+: Coincide con uno o más caracteres que pueden ser letras mayúsculas o minúsculas (a-zA-Z), dígitos (0-9), o los caracteres ., _, %, +, -.
    @: Coincide con el carácter @.
    [a-zA-Z0-9.-]+: Coincide con uno o más caracteres que pueden ser letras mayúsculas o minúsculas (a-zA-Z), dígitos (0-9), o los caracteres . y -.
    \.: Coincide con el carácter . 
    [a-zA-Z]{2,4}: Coincide con entre 2 y 4 letras mayúsculas o minúsculas (a-zA-Z), que representan el dominio de nivel superior (como com, net, org, etc.).
    $: Indica el final de la cadena.
    
    */

    @ApiProperty({
        description: 'User Password',
        required: true,
        example: 'StrongPassword123!',
    })
    @IsNotEmpty({ message: 'Password must not be empty' })
    password: string;
}