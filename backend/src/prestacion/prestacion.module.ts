import { Module } from '@nestjs/common';
import { PrestacionService } from './prestacion.service';
import { PrestacionController } from './prestacion.controller';

@Module({
  controllers: [PrestacionController],
  providers: [PrestacionService],
})
export class PrestacionModule {}
