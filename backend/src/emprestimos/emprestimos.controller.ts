import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';

@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Post()
  create(@Body() createEmprestimoDto: CreateEmprestimoDto) {
    return this.emprestimosService.create(createEmprestimoDto);
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
  update(@Param('id') id: string, @Body() updateEmprestimoDto: UpdateEmprestimoDto) {
    return this.emprestimosService.update(+id, updateEmprestimoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emprestimosService.remove(+id);
  }
}
