import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(user: CreateUserDto) {

    if (!user) {
      return { success: false, message: 'Error in response body' };
    }

    // validar que el usuario no exista en la base de datos
    const foundUser = await this.searchUserByEmail(user.email);

    if (foundUser) {
      return { success: false, message: 'Already registered user' };
    }

    const hashedPassword = await this.encryptPassword(user.password, parseInt(process.env.SALT_ROUNDS));
    
    const { userType } = user;

    if (userType === UserType.ADMIN) {
      console.log('Eres un tipo admin', userType);

      if (!user.admin?.department) {
        console.log(`departament: ${user.admin?.department}`);
        throw new Error("El departamento del administrador es obligatorio.");
      }

      const admin = await this.prisma.admin.create({
        data: {
          department: user.admin.department,
          user: {
            create: {
              email: user.email,
              password: hashedPassword,
              userType: UserType.ADMIN,
              contact: {
                create: {
                  telephone: user.telephone ?? '',
                  firstName: user.firstName ?? '',
                  lastName: user.lastName ?? '',
                },
              },
            },
          },
        },
      });

      console.log('Admin created successfully:', admin);

    } else if (userType === UserType.PATIENT) {

      console.log('Eres un tipo paciente', userType);

      const patient = await this.prisma.patient.create({
        data: {
          user: {
            create: {
              email: user.email,
              password: hashedPassword,
              userType: UserType.PATIENT,
              contact: {
                create: {
                  telephone: user.telephone ?? '',
                  firstName: user.firstName ?? '',
                  lastName: user.lastName ?? '',
                },
              },
            },
          },
        },
      });

    } else if (userType === UserType.DOCTOR) {
      console.log('Eres un tipo doctor', userType);

      if (!user.doctor?.specialty) {
        throw new Error("La especialidad del doctor es obligatoria.");
      }

      const doctor = await this.prisma.doctor.create({
        data: {
          specialty: {
            create: {
              name: user.doctor.specialty,
            }
          },
          user: {
            create: {
              email: user.email,
              password: hashedPassword,
              userType: UserType.DOCTOR,
              contact: {
                create: {
                  telephone: user.telephone ?? '',
                  firstName: user.firstName ?? '',
                  lastName: user.lastName ?? '',
                },
              },
            },
          },
        },
      });
    } else {
      console.log('Eres un tipo desconocido', userType);
      return { success: false, message: 'Unknown user type' };
    }

    return { success: true, message: 'User created successfully.' };

  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async searchUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
  }

  private encryptPassword(password: string, salt: number) {
    return bcrypt.hash(password, salt);
  }
}
