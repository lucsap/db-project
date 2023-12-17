import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('livros')
@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @UseGuards(JwtAuthGuard)
  @Post('cadastro')
  @ApiOperation({ summary: 'Cadastra um novo livro' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso' })
  @ApiBody({
    schema: {
      example: {
        isbn: '978-85-336-1341-5',
        categoria: 'Fantasia',
        titulo: 'O Senhor dos Anéis',
        autor: 'J. R. R. Tolkien',
        localizacao_fisica: 'Estante 1',
        estado_conservacao: 'Bom',
        uri_capa_livro: 'https://i.imgur.com/2qJtj2O.jpg',
      }
    }
  })
  create(
    @Body() createLivroDto: CreateLivroDto,
    @Req() req: any,
  ) {
    return this.livrosService.create(createLivroDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Lista todos os livros' })
  @ApiResponse({ status: 200, description: 'Lista de livros' })
  findAll(@Req() req: any) {
    return this.livrosService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':isbn')
  @ApiOperation({ summary: 'Busca um livro pelo ISBN' })
  @ApiResponse({ status: 200, description: 'Livro encontrado' })
  findOne(@Param('isbn') isbn: string, @Req() req: any) {
    return this.livrosService.findOne(+isbn, req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':isbn')
  @ApiOperation({ summary: 'Atualiza informações de um livro' })
  @ApiResponse({ status: 200, description: 'Informações atualizadas' })
  update(@Param('isbn') isbn: string, 
         @Body() updateLivroDto: CreateLivroDto,
         @Req() req: any
        ) {
    return this.livrosService.update(+isbn, updateLivroDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':isbn')
  @ApiOperation({ summary: 'Remove um livro' })
  @ApiResponse({ status: 200, description: 'Livro removido' })
  remove(
    @Param('isbn') isbn: string,
    @Req() req: any,
  ) {
    return this.livrosService.remove(+isbn, req);
  }
}
