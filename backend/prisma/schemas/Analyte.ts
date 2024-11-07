import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Analyte() {
    const analytes = [
        { parameter: 'Glucose', units: 'mg/dL', normalRange: '70-100' },
        { parameter: 'Cholesterol', units: 'mg/dL', normalRange: '<200' },
        { parameter: 'Hemoglobin', units: 'g/dL', normalRange: '13.5-17.5' },
        { parameter: 'Sodium', units: 'mEq/L', normalRange: '135-145' },
        { parameter: 'Potassium', units: 'mEq/L', normalRange: '3.5-5.0' },
      ];
    
      await prisma.analyte.createMany({
        data: analytes,
      });
    
      console.log('Analytes created successfully');
}