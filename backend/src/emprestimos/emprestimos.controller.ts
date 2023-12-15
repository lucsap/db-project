import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimoLivrosDto } from './dto/emprestimo-livros.dto';
import { UpdateEmprestimoLivrosDto } from './dto/update-emprestimo-livros.dto';

@Controller('emprestimo')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Post('livros')
  create(@Body() emprestimoLivrosDto: EmprestimoLivrosDto) {
    return this.emprestimosService.emprestimoLivros(emprestimoLivrosDto);
  }

  @Get()
  findAll() {
    return this.emprestimosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emprestimosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmprestimoLivrosDto: UpdateEmprestimoLivrosDto) {
    return this.emprestimosService.update(+id, updateEmprestimoLivrosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emprestimosService.remove(+id);
  }
}
