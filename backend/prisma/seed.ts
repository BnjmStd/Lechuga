import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear un paciente
  const paciente1 = await prisma.paciente.create({
    data: {
      usuario: {
        create: {
          email: 'paciente2@example.com',
          password: 'contraseña2',
          tipoUsuario: 'PACIENTE',
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
      historialMedico: {
        create: {
          descripcion: 'Alergia a la penicilina',
          // otros campos del historial médico...
        },
      },
      exams: {
        create: [
          {
            nombre: 'Examen de sangre',
            numero_orden: 1,
            contenido: 'Resultado de hemoglobina y otros parámetros.',
            format: 'PDF',
          },
        ],
      },
    },
  });

  // Crear un médico
  const medico1 = await prisma.medico.create({
    data: {
      especialidad: 'Pediatría',
      usuario: {
        create: {
          email: 'medico1@example.com',
          password: 'contraseña3',
          tipoUsuario: 'MEDICO',
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
                nombre: 'Hospital General',
                direccion: 'Calle Principal 123',
                telefono: '555555555',
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
      nombre: 'Radiografía de tórax',
      numero_orden: 2,
      contenido: 'Radiografía para evaluar el estado de los pulmones.',
      format: 'IMAGEN',
      paciente: {
        connect: { id: paciente1.id },
      },
    },
  });

  // Crear una entidad
  const entidad1 = await prisma.entidad.create({
    data: {
      nombre: 'Clínica de Salud',
      direccion: 'Avenida Secundaria 456',
      telefono: '777777777',
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
  const administrador1 = await prisma.administrador.create({
    data: {
      departamento: 'Recursos Humanos',
      usuario: {
        create: {
          email: 'admin1@example.com',
          password: 'contraseña4',
          tipoUsuario: 'ADMINISTRADOR',
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
  const medicamentos = await prisma.medicamento.createMany({
    data: [
      {
        name: "Amoxicilina",
        dosis: "500 mg cada 8 horas",
        tipo: "Antibiótico",
        descripcion: "Utilizado para tratar diversas infecciones bacterianas.",
        efectosSecundarios: "Náuseas, erupciones cutáneas.",
        contraindicaciones: "Alergia a la penicilina.",
      },
      {
        name: "Ibuprofeno",
        dosis: "400 mg cada 6 horas",
        tipo: "Analgésico",
        descripcion: "Usado para aliviar el dolor y reducir la inflamación.",
        efectosSecundarios: "Malestar estomacal, mareos.",
        contraindicaciones: "Úlceras gástricas.",
      },
      {
        name: "Paracetamol",
        dosis: "500 mg cada 8 horas",
        tipo: "Analgésico",
        descripcion: "Medicamento común para el alivio del dolor.",
        efectosSecundarios: "Pocas reacciones adversas, generalmente seguro.",
        contraindicaciones: "Enfermedades hepáticas severas.",
      },
      {
        name: "Sertralina",
        dosis: "50 mg una vez al día",
        tipo: "Antidepresivo",
        descripcion: "Usado para tratar trastornos depresivos y de ansiedad.",
        efectosSecundarios: "Náuseas, insomnio.",
        contraindicaciones: "Alergias a inhibidores selectivos de la recaptación de serotonina.",
      },
    ],
  });

  console.log("Medicamentos creados:", medicamentos);

  // analitos
  const analitos = await prisma.analito.createMany({
    data: [
      {
        nombre: "Glucosa",
        unidades: "mg/dL",
        rangoNormal: "70-100",
      },
      {
        nombre: "Colesterol Total",
        unidades: "mg/dL",
        rangoNormal: "125-200",
      },
      {
        nombre: "Triglicéridos",
        unidades: "mg/dL",
        rangoNormal: "50-150",
      },
      {
        nombre: "HDL (Colesterol Bueno)",
        unidades: "mg/dL",
        rangoNormal: "40-60",
      },
      {
        nombre: "LDL (Colesterol Malo)",
        unidades: "mg/dL",
        rangoNormal: "<130",
      },
      {
        nombre: "Creatinina",
        unidades: "mg/dL",
        rangoNormal: "0.6-1.2",
      },
      {
        nombre: "Bilirrubina Total",
        unidades: "mg/dL",
        rangoNormal: "0.1-1.2",
      },
      {
        nombre: "Ácido Úrico",
        unidades: "mg/dL",
        rangoNormal: "3.5-7.2",
      },
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
