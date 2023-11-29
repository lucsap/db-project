import { Module } from '@nestjs/common';
import { MateriaisService } from './materiais.service';

@Module({
  providers: [MateriaisService]
})
export class MateriaisModule {}
