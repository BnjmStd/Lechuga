import { Module } from '@nestjs/common';
import { AnalyteService } from './analyte.service';
import { AnalyteController } from './analyte.controller';

@Module({
  controllers: [AnalyteController],
  providers: [AnalyteService],
})
export class AnalyteModule {}
