import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear un paciente
  const paciente1 = await prisma.patient.create({
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
      medicalHistory: {
        create: {
          descripcion: 'Alergia a la penicilina',
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

  // Crear un médico
  const medico1 = await prisma.doctor.create({
    data: {
      especialidad: 'Pediatría',
      usuario: {
        create: {
          email: 'medico1@example.com',
          password: 'contraseña3',
          userType: 'MEDICO',
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
      prestaciones: {
        create: [
          {
            entidad: {
              create: {
                name: 'Hospital General',
                address: 'Calle Principal 123',
                telephone: '555555555',
                tipoEntidad: 'PUBLICO',
              },
            },
            prestacion: {
              create: {
                nombre: 'Consulta pediátrica',
                descripcion: 'Consulta general para niños',
                cobertura: 80,
                costo: 100,
                tipoPrestacion: {
                  create: {
                    nombre: 'Consulta',
                    descripcion: 'Consulta médica general',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });

  // Crear un examen
  const exam1 = await prisma.exam.create({
    data: {
      name: 'Radiografía de tórax',
      orderNumber: 2,
      content: 'Radiografía para evaluar el estado de los pulmones.',
      format: 'IMAGEN',
      patient: {
        connect: { id: paciente1.id },
      },
    },
  });

  // Crear una entidad
  const entidad1 = await prisma.entidad.create({
    data: {
      name: 'Clínica de Salud',
      address: 'Avenida Secundaria 456',
      telephone: '777777777',
      tipoEntidad: 'PRIVADO',
      prestaciones: {
        create: [
          {
            prestacion: {
              create: {
                nombre: 'Consulta especializada',
                descripcion: 'Consulta con un especialista',
                cobertura: 90,
                costo: 150,
                tipoPrestacion: {
                  create: {
                    nombre: 'Especialidad',
                    descripcion: 'Consulta médica con un especialista',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });

  // Crear un administrador
  const administrador1 = await prisma.admin.create({
    data: {
      department: 'Recursos Humanos',
      user: {
        create: {
          email: 'admin1@example.com',
          password: 'contraseña4',
          userType: 'ADMINISTRADOR',
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

  // Crear categorías
  const categorias = await prisma.categorias.createMany({
    data: [
      {
        name: "Antibióticos",
        descripcion: "Medicamentos usados para tratar infecciones bacterianas.",
        tipoCategoria: "Farmacológico",
        codigo: "AB001",
      },
      {
        name: "Analgésicos",
        descripcion: "Medicamentos utilizados para aliviar el dolor.",
        tipoCategoria: "Farmacológico",
        codigo: "AN002",
      },
      {
        name: "Antiinflamatorios",
        descripcion: "Medicamentos que reducen la inflamación.",
        tipoCategoria: "Farmacológico",
        codigo: "AI003",
      },
      {
        name: "Antidepresivos",
        descripcion: "Medicamentos utilizados para tratar la depresión.",
        tipoCategoria: "Psiquiátrico",
        codigo: "AD004",
      },
    ],
  });

  console.log("Categorías creadas:", categorias);

  // medicamentos
  const medicamentos = await prisma.medicine.createMany({
    data: [
      {
        name: "Amoxicilina",
        dosage: "500 mg cada 8 horas",
        type: "Antibiótico",
        description: "Utilizado para tratar diversas infecciones bacterianas.",
        sideEffects: "Náuseas, erupciones cutáneas.",
        contraindications: "Alergia a la penicilina.",
      },
      {
        name: "Ibuprofeno",
        dosage: "400 mg cada 6 horas",
        type: "Analgésico",
        description: "Usado para aliviar el dolor y reducir la inflamación.",
        sideEffects: "Malestar estomacal, mareos.",
        contraindications: "Úlceras gástricas.",
      },
      {
        name: "Paracetamol",
        dosage: "500 mg cada 8 horas",
        type: "Analgésico",
        description: "Medicamento común para el alivio del dolor.",
        sideEffects: "Pocas reacciones adversas, generalmente seguro.",
        contraindications: "Enfermedades hepáticas severas.",
      },
      {
        name: "Sertralina",
        dosage: "50 mg una vez al día",
        type: "Antidepresivo",
        description: "Usado para tratar trastornos depresivos y de ansiedad.",
        sideEffects: "Náuseas, insomnio.",
        contraindications: "Alergias a inhibidores selectivos de la recaptación de serotonina.",
      },
    ],
  });

  console.log("Medicamentos creados:", medicamentos);

  // analitos
  const analitos = await prisma.analyte.createMany({
    data: [
      {
        parameter: "Glucosa",
        units: "mg/dL",
        normalRange: "70-100",
      },
      {
        parameter: "Colesterol Total",
        units: "mg/dL",
        normalRange: "125-200",
      }
    ],
  });

  console.log({ paciente1, medico1, exam1, entidad1, administrador1 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
