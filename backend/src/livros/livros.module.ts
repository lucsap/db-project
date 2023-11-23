import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';

@Module({
  providers: [LivrosService],
  controllers: [LivrosController]
})
export class LivrosModule {}
