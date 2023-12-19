import { Controller, Get, Post, Body, Req, UseGuards, Patch, Param } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimoDto } from './dto/emprestimo.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateEmprestimoDto } from './dto/update-emprestimo-livros.dto';

@ApiBearerAuth()
@ApiTags('emprestimos')
@Controller('emprestimo')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Emprestar item' })
  @ApiResponse({ status: 200, description: 'Item emprestado com sucesso' })
  @ApiBody({
    schema: {
      example: {
        id_item: 1,
        id_usuario: 1,
        tipo_item: 'livro',
        status: true,
      }
    }
  })
  async emprestimosCreate(
    @Body() emprestimoLivrosDto: EmprestimoDto,
    @Req() req: any,
  ) {
    return await this.emprestimosService.emprestimo(req, emprestimoLivrosDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar emprestimos' })
  @ApiResponse({ status: 200, description: 'Lista de emprestimos' })
  async findAll(@Req() req: any) {
    return await this.emprestimosService.findAll(req);
  }

  @Get('itens')
  @ApiOperation({ summary: 'Listar todos os itens'})
  @ApiResponse({ status: 200, description: 'Lista de itens'})
  async findAllItens() {
    return await this.emprestimosService.findAllItens();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Listar um item emprestado' })
  @ApiResponse({ status: 200, description: 'Item' })
  async findOne(@Req() req: any) {
    return await this.emprestimosService.findOne(req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('devolucao')
  @ApiOperation({ summary: 'Devolver item' })
  @ApiResponse({ status: 200, description: 'Item devolvido com sucesso' })
  @ApiBody({
    schema: {
      example: {
        id_item: 1,
        id_usuario: 1,
        tipo_item: 'livro',
        status: false,
      }
    }
  })
  async devolucao(@Req() req: any, @Body() updateEmprestimosDto: UpdateEmprestimoDto) {
    return await this.emprestimosService.returnItem(req, updateEmprestimosDto);
  }

}
