import { PrismaClient } from '@prisma/client';

import Pacientes from './schemas/patient';
import MedicineCategory from './schemas/medicineCategory';
import ServicesIntitute from './schemas/ServicesIntitute';
import Doctor from './schemas/Doctor';
import MedicalSpecialty from './schemas/MedicalSpecialty';
import Admin from './schemas/Admin';
import Analyte from './schemas/Analyte';

const prisma = new PrismaClient();

async function main() {
  Pacientes()
  MedicineCategory()
  ServicesIntitute()
  MedicalSpecialty()
  Doctor()
  Admin()
  Analyte()
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
