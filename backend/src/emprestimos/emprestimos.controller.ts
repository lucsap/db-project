import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimoLivrosDto } from './dto/emprestimo-livros.dto';
import { EmprestimoMateriaisDto } from './dto/emprestimo-materiais.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('emprestimo')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @UseGuards(JwtAuthGuard)
  @Post('livros')
  async emprestimosLivrosCreate(
    @Body() emprestimoLivrosDto: EmprestimoLivrosDto,
    @Req() req: any,
  ) {
    return await this.emprestimosService.emprestimoLivros(req, emprestimoLivrosDto);
  }

  @Post('materiais')
  async emprestimosMateriaisCreate(@Body() emprestimoMateriaisDto: EmprestimoMateriaisDto) {
    return await this.emprestimosService.emprestimoMateriaisDidaticos(emprestimoMateriaisDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('livros')
  async findAllLivros(@Req() req: any) {
    return await this.emprestimosService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('devolucao')
  async devolucaoLivro(@Req() req: any, @Body() updateEmprestimosDto: EmprestimoLivrosDto) {
    return await this.emprestimosService.returnItem(req, updateEmprestimosDto);
  }

}
