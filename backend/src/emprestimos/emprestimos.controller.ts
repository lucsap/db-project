import { Controller, Get, Post, Body, Req, UseGuards, Patch } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimoDto } from './dto/emprestimo.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('emprestimo')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async emprestimosLivrosCreate(
    @Body() emprestimoLivrosDto: EmprestimoDto,
    @Req() req: any,
  ) {
    return await this.emprestimosService.emprestimo(req, emprestimoLivrosDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('livros')
  async findAllLivros(@Req() req: any) {
    return await this.emprestimosService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('livros/:id')
  async findOneLivro(@Req() req: any) {
    return await this.emprestimosService.findOne(req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('devolucao')
  async devolucaoLivro(@Req() req: any, @Body() updateEmprestimosDto: EmprestimoDto) {
    return await this.emprestimosService.returnItem(req, updateEmprestimosDto);
  }

}
