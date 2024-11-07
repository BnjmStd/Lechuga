import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Pacientes () {

    const patient1 = await prisma.patient.create({
        data: {
            user: {
                create: {
                    email: 'paciente1@example.com',
                    password: 'contraseña2',
                    userType: 'PACIENTE',
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
            medicalHistory: {
                create: {
                    description: 'Alergia a la penicilina',
                    // otros campos del historial médico...
                },
            },
            exams: {
                create: [
                    {
                        name: 'Examen de sangre',
                        orderNumber: 1,
                        content: 'Resultado de hemoglobina y otros parámetros.',
                        format: 'PDF',
                    },
                ],
            },
        },
    });

    const patient2 = await prisma.patient.create({
        data: {
            user: {
                create: {
                    email: 'paciente2@example.com',
                    password: 'contraseña2',
                    userType: 'PACIENTE',
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
            exams: {
                create: [
                    {
                        name: 'Examen de sangre',
                        orderNumber: 1,
                        content: 'Resultado de hemoglobina y otros parámetros.',
                        format: 'PDF',
                    },
                ],
            },
        },
    })

    console.log("Pacientes creados:", patient1, patient2);	
}