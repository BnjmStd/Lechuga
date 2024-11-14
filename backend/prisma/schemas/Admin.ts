import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Admin() {
    
    const administrador1 = await prisma.admin.create({
        data: {
          department: 'Recursos Humanos',
          user: {
            create: {
              email: 'admin1@example.com',
              password: 'contraseña4',
              userType: 'ADMIN',
              contact: {
                create: {
                  telephone: '321321321',
                  firstName: 'Ana',
                  lastName: 'López',
                  age: 21,
                },
              },
            },
          },
        },
      });

    console.log('Admin created successfully:', administrador1);
}