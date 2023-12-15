import { Module } from '@nestjs/common';
import { EmprestimosController } from './emprestimos.controller';
import { EmprestimosService } from './emprestimos.service';

@Module({
  imports: [],
  providers: [EmprestimosService],
  controllers: [EmprestimosController],
})
export class EmprestimosModule {}
