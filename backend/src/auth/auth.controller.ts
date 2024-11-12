import { Controller, Post, Body, HttpCode, HttpStatus, Res, HttpException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
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
    async login(@Body() data: LoginDto, @Res() res: Response) {
        try {

            const token = await this.authService.validateUser(data);

            if (!token) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
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
