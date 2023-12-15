import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimoLivrosDto } from './dto/emprestimo-livros.dto';
import { EmprestimoMateriaisDto } from './dto/emprestimo-materiais.dto';

@Controller('emprestimo')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Post('livros')
  async emprestimosLivrosCreate(@Body() emprestimoLivrosDto: EmprestimoLivrosDto) {
    return await this.emprestimosService.emprestimoLivros(emprestimoLivrosDto);
  }

  @Post('materiais')
  async emprestimosMateriaisCreate(@Body() emprestimoMateriaisDto: EmprestimoMateriaisDto) {
    return await this.emprestimosService.emprestimoMateriaisDidaticos(emprestimoMateriaisDto)
  }

  @Get('livros')
  findAllLivros() {
    return this.emprestimosService.findAll();
  }

  @Get('materiais')
  findAllMateriais() {
    return this.emprestimosService.findAll();
  }

  @Get(':id')
  findOneLivros(@Param('id') id: string) {
    return this.emprestimosService.findOne(+id);
  }

  @Get(':id')
  findOneMateriais(@Param('id') id: string) {
    return this.emprestimosService.findOne(+id);
  }
}
