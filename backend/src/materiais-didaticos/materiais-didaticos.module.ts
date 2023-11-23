import { Module } from '@nestjs/common';
import { MateriaisDidaticosService } from './materiais-didaticos.service';
import { MateriaisDidaticosController } from './materiais-didaticos.controller';

@Module({
  providers: [MateriaisDidaticosService],
  controllers: [MateriaisDidaticosController]
})
export class MateriaisDidaticosModule {}
