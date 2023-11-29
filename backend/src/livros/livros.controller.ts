import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';

@Controller('/livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post('cadastro')
  create(@Body() createLivroDto: CreateLivroDto) {
    return this.livrosService.create(createLivroDto);
  }

  @Get()
  findAll() {
    return this.livrosService.findAll();
  }

  @Get(':isbn')
  findOne(@Param('isbn') isbn: string) {
    return this.livrosService.findOne(+isbn);
  }

  @Patch(':isbn')
  update(@Param('isbn') isbn: string, @Body() updateLivroDto: CreateLivroDto) {
    return this.livrosService.update(+isbn, updateLivroDto);
  }

  @Delete(':isbn')
  remove(@Param('isbn') isbn: string) {
    return this.livrosService.remove(+isbn);
  }
}
