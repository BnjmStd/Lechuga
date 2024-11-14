import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

process.loadEnvFile();

@Injectable()
export class AuthService {

    constructor(

        private jwtServices: JwtService,
        private prisma: PrismaService,

    ) { }

    async validateUser(user: LoginDto) {
        try {

            // encontrar el usuario en la base de datos

            if (!this.validateEmail(user.email)) return { success: false, message: 'Invalid email' };

            const foundUser = await this.searchUserByEmail(user.email);

            if (!foundUser) return { success: false, message: 'User not found' };;

            // validar que la contraseña sea correcta

            const passwordIsValid = await this.validatePasswordToken(user.password, foundUser.password);

            if (!passwordIsValid) return { success: false, message: 'Invalid password' };

            // generar un token de autenticación

            const token = this.generateToken({ id: foundUser.id, email: foundUser.email });

            return {
                success: true,
                token,
            }
            
        } catch (error) {
            throw new Error(error);
        }
    }

    async createUserSignUp(user: SignupDto) {
        try {

            // validar todos los campos del usuario

            if (!user.email || !user.password || !user.name || !user.age) return { success: false, message: 'Error in response body' };

            if (user.password !== user.passwordConfirm) {
                return { success: false, message: 'Passwords do not match' };
            }

            if (!this.validateEmail(user.email)) {
                return { success: false, message: 'Invalid email' };
            }

            if (!this.validPasswordRegex(user.password)) {
                return { success: false, message: 'Password must meet requirements' };
            }

            // validar que el usuario no exista en la base de datos
            const foundUser = await this.searchUserByEmail(user.email);

            if (foundUser) {
                return { success: false, message: 'Already registered user' };
            }

            const hashedPassword = await this.encryptPassword(user.password, parseInt(process.env.SALT_ROUNDS));

            // crear el usuario en la base de datos

            const patient = await this.prisma.patient.create({
                data: {
                    user: {
                        create: {
                            email: user.email,
                            password: hashedPassword,
                            userType: 'PATIENT',
                            contact: {
                                create: {
                                    firstName: user.name,
                                    age: user.age,
                                },
                            },
                        },
                    },
                },
                include: {
                    user: true,  // Incluye la relación `user` en el resultado
                },
            });

            return {
                success: true,
                message: 'User registered in the database',
                data: {
                    patient: {
                        id: patient.id,
                        email: patient.user.email,
                        createdAt: patient.user.createAt,
                        userType: patient.user.userType,
                    },
                },
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    private async searchUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    private validPasswordRegex(password: string) {
        /* 
        
            Longer than 8 characters
            Includes a lowercase letter
            Includes an uppercase letter
            Includes a number
            Includes a specaial character
            max 15 characters
        
        */

        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password);
    }

    private validatePasswordToken(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }

    private validateEmail(email: string) {
        return email.includes('@');
    }

    private encryptPassword(password: string, salt: number) {
        return bcrypt.hash(password, salt);
    }

    private generateToken({ id, email }: { id: number, email: string }) {
        return this.jwtServices.sign(
            {
                id: id,
                email: email,
            }
        )
    }
}
