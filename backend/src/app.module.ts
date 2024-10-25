import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ExamsModule } from './exams/exams.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { AnalyteModule } from './analyte/analyte.module';
import { CategoriesMedicinesModule } from './categories-medicines/categories-medicines.module';
import { MedicinesModule } from './medicines/medicines.module';
import { PrestacionModule } from './prestacion/prestacion.module';
import { EntidadModule } from './entidad/entidad.module';

@Module({
  imports: [
    UsersModule, 
    ExamsModule, 
    PrismaModule, 
    AuthModule, 
    MedicalHistoryModule, AnalyteModule, CategoriesMedicinesModule, MedicinesModule, PrestacionModule, EntidadModule,
  ],
})
export class AppModule {}
