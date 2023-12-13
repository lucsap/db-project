import { Module } from '@nestjs/common';
import { MateriaisService } from './materiais.service';
import { MateriaisController } from './materiais.controller';

@Module({
  imports: [],
  controllers: [MateriaisController],
  providers: [MateriaisService]
})
export class MateriaisModule {}
