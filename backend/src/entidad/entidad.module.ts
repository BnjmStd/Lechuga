import { Module } from '@nestjs/common';
import { EntidadService } from './entidad.service';
import { EntidadController } from './entidad.controller';

@Module({
  controllers: [EntidadController],
  providers: [EntidadService],
})
export class EntidadModule {}
