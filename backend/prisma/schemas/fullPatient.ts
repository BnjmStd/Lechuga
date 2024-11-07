import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear un nuevo paciente con todos los datos relacionados
export default async function createFullPatient() {
  const newPatient = await prisma.patient.create({
    data: {
      user: {
        create: {
          email: 'juan.perez@example.com',
          password: 'securePassword123',
          userType: 'PACIENTE',
          contact: {
            create: {
              firstName: 'Juan',
              lastName: 'Perez',
              telephone: '123456789',
              address: 'Calle Ficticia 123',
              age: 30,
            },
          },
        },
      },
      gender: 'MALE',
      currentWeight: 70.5,
      currentHeight: 1.75,
      weightHeightHistory: {
        create: [
          {
            weight: 70.5,
            height: 1.75,
            recordDate: new Date(),
            imc: 23.0,
            fat: 18.5,
            muscle: 32.0,
            water: 55.0,
          },
        ],
      },
      medicalHistory: {
        create: [
          {
            description: 'Diagnóstico general',
            date: new Date(),
            medicalIndications: {
              create: [
                {
                  texto: 'Recomendación de reposo por 48 horas.',
                  fecha: new Date(),
                },
              ],
            },
            medicines: {
              create: [
                {
                  medicine: {
                    create: {
                      name: 'Ibuprofeno',
                      dosage: '200mg',
                      type: 'Antiinflamatorio',
                      description: 'Para el dolor',
                      sideEffects: 'Nauseas',
                      contraindications: 'Alergia al ácido acetilsalicílico',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      medicalRecommendation: {
        create: [
          {
            name: 'Seguimiento de tratamiento',
            description: 'Es recomendable un seguimiento después de 10 días de tratamiento.',
            date: new Date(),
          },
        ],
      },
      exams: {
        create: [
          {
            name: 'Examen de sangre',
            orderNumber: 1234,
            content: 'Contenido del examen',
            format: 'PDF',
            sampleDate: new Date(),
            receptionDate: new Date(),
            result: {
              create: [
                {
                  valor: 7.2,
                  analito: {
                    create: {
                      parameter: 'Glucosa',
                      units: 'mg/dL',
                      normalRange: '70-100',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      prestaciones: {
        create: [
          {
            service: {
              create: {
                name: 'Consulta médica',
                description: 'Consulta general con el doctor.',
                cost: 50.0,
                serviceType: {
                  connect: { id: 1 },
                },
              },
            },
            institution: {
              connect: { id: 1 },
            },
          },
          {
            service: {
              create: {
                name: 'Examen de laboratorio',
                description: 'Examen de sangre completo.',
                cost: 30.0,
                serviceType: {
                  connect: { id: 2 }, 
                },
              },
            },
            institution: {
              connect: { id: 1 }, 
            },
          },
        ],
      },
    },
  });

  console.log('Paciente creado:', newPatient);
}