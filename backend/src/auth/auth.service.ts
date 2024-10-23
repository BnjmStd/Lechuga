import { Injectable } from '@nestjs/common';
import {
    JwtService
} from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/singup.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtServices: JwtService,
        private prisma: PrismaService,
    ) {}

    async validateUser(user: LoginDto) {
        const foundUser = await this.prisma.usuario.findUnique({
            where: {
                email: user.email
            }
        });

        if (!foundUser) return null;

        if (foundUser.password === user.password) {
            return this.jwtServices.sign(
                {
                    id:foundUser.id,
                    email: foundUser.email,
                }
            )
        }
    }

    async createUserSignUp(user: SignupDto) {
        if (!user) return

        console.log(user)

        return {
            isValid: true
        }
    }
}
