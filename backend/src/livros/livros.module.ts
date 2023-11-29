import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';

@Module({
  imports: [],
  providers: [LivrosService],
  controllers: [LivrosController],
})
export class LivrosModule {}
