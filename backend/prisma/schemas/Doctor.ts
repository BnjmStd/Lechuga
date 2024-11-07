import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Doctor() {

  const user = await prisma.user.create({
    data: {
      email: 'doctor@example.com',
      password: 'securePassword123',
      userType: 'MEDICO',
      contact: {
        create: {
          firstName: 'Doctor',
          lastName: 'Example',
          telephone: '987654321',
          address: 'Calle Ficticia 456',
          age: 45,
        },
      },
    },
  });

  const doctor = await prisma.doctor.create({
    data: {
      specialty: {
        connect: { id: 1 },
      },
      user: {
        connect: { id: user.id },
      },
    },
  });

  console.log('Doctor creado:', doctor)
}