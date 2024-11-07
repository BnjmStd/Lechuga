import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function MedicalSpecialty() {
         
    const specialties = [
        { name: 'Cardiology', description: 'Focuses on heart disorders and conditions.' },
        { name: 'Neurology', description: 'Specializes in treating disorders of the nervous system.' },
        { name: 'Orthopedics', description: 'Deals with bone and muscle conditions and injuries.' },
        { name: 'Pediatrics', description: 'Provides medical care for children and adolescents.' },
        { name: 'Dermatology', description: 'Focuses on skin, hair, and nail conditions.' }
      ];
    
      await prisma.medicalSpecialty.createMany({
        data: specialties,
      });
    
      console.log('Medical specialties created successfully');
}