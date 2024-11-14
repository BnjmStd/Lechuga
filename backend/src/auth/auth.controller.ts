import { Controller, Post, Body, HttpCode, HttpStatus, Res, HttpException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Authentication and registration')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @Post('login')
    @Public()
    @ApiOkResponse({
        description: 'User successfully logged in, token generated.',
        schema: {
            example: {
                success: true,
                token: 'jwt-token-example',
            },
        },
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized. Invalid credentials provided.',
        schema: {
            example: {
                success: false,
                message: 'Invalid credentials',
            },
        },
    })
    @ApiInternalServerErrorResponse({
        description: 'Server error occurred during login attempt.',
        schema: {
            example: {
                success: false,
                message: 'An error occurred while trying to login.',
            },
        },
    })
    async login(@Body() data: LoginDto, @Res() res: Response) {
        try {

            const token = await this.authService.validateUser(data);

            if (!token.success) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            return res.status(HttpStatus.OK).json({
                token,
            });


        } catch (error) {

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'An error occurred while trying to login.',
            });

        }
    }

    @Post('Singup')
    @Public()
    @ApiCreatedResponse({
        description: 'User has been successfully created.',
        schema: {
            example: {
                success: true,
                message: 'User created successfully.',
                data: { },
            },
        },
    })
    @ApiBadRequestResponse({
        description: 'Bad request. Validation failed or user could not be created.',
        schema: {
            example: {
                success: false,
                message: 'Validation error message or custom error message from createdUser.',
            },
        },
    })
    @ApiInternalServerErrorResponse({
        description: 'Server error occurred while creating the user.',
        schema: {
            example: {
                success: false,
                message: 'An error occurred while creating the user.',
            },
        },
    })
    async signup(@Body() data: SignupDto, @Res() res: Response) {
        try {

            const createdUser = await this.authService.createUserSignUp(data);

            if (!createdUser.success) {

                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: `${createdUser.message}`,
                });

            }

            return res.status(HttpStatus.CREATED).json({
                ...createdUser,
            });

        } catch (error) {

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'An error occurred while creating the user.',
            });

        }
    }
}
