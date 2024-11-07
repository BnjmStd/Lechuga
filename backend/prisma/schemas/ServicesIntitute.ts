import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ServicesInstitute() {

  const healthInstitutions = await prisma.healthInstitution.createMany({
    data: [
      { name: 'Public Health Clinic', institutionType: 'PUBLICO' },
      { name: 'Private Hospital', institutionType: 'PRIVADO' },
      { name: 'University Hospital', institutionType: 'PUBLICO' },
      { name: 'Private Dermatology Clinic', institutionType: 'PRIVADO' },
      { name: 'Public Pediatric Center', institutionType: 'PUBLICO' },
      { name: 'Private Mental Health Center', institutionType: 'PRIVADO' },
      { name: 'Public General Hospital', institutionType: 'PUBLICO' },
      { name: 'Private Oncology Clinic', institutionType: 'PRIVADO' },
      { name: 'Regional Public Emergency Center', institutionType: 'PUBLICO' },
    ],
  });

  const serviceTypes = await prisma.serviceType.createMany({
    data: [
      { name: 'Consulta', description: 'Consulta médica general' },
      { name: 'Examen', description: 'Examen de laboratorio' },
      { name: 'Cirugía', description: 'Procedimientos quirúrgicos' },
      { name: 'Terapia', description: 'Terapias y tratamientos' },
      { name: 'Diagnóstico', description: 'Servicios de diagnóstico' },
      { name: 'Emergencia', description: 'Atención de emergencias' },
    ],
  });

  const consultaType = await prisma.serviceType.findFirst({ where: { name: 'Consulta' } });
  const examenType = await prisma.serviceType.findFirst({ where: { name: 'Examen' } });
  const cirugiaType = await prisma.serviceType.findFirst({ where: { name: 'Cirugía' } });
  const terapiaType = await prisma.serviceType.findFirst({ where: { name: 'Terapia' } });
  const diagnosticoType = await prisma.serviceType.findFirst({ where: { name: 'Diagnóstico' } });
  const emergenciaType = await prisma.serviceType.findFirst({ where: { name: 'Emergencia' } });

  const medicalServices = await prisma.medicalService.createMany({
    data: [
      { name: 'General Medicine', serviceTypeId: consultaType?.id },
      { name: 'Pediatrics', serviceTypeId: consultaType?.id },
      { name: 'Cardiology', serviceTypeId: diagnosticoType?.id },
      { name: 'Orthopedics', serviceTypeId: cirugiaType?.id },
      { name: 'Dermatology', serviceTypeId: consultaType?.id },
      { name: 'Neurology', serviceTypeId: diagnosticoType?.id },
      { name: 'Psychiatry', serviceTypeId: terapiaType?.id },
      { name: 'Oncology', serviceTypeId: diagnosticoType?.id },
      { name: 'Gynecology', serviceTypeId: consultaType?.id },
      { name: 'Emergency Care', serviceTypeId: emergenciaType?.id },
    ],
  });

  console.log('Se crearon las entidades de salud y servicios médicos', healthInstitutions, medicalServices);
}