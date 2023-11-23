import { Module } from '@nestjs/common';
import { ItensController } from './itens.controller';
import { ItensService } from './itens.service';

@Module({
  providers: [ItensService],
  controllers: [ItensController],
})
export class ItensModule {}
