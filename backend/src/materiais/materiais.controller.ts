import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { MateriaisService } from './materiais.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('materiais')
@Controller('materiais')
export class MateriaisController {
  constructor(private readonly materiaisService: MateriaisService) {}

  @Post('cadastro')
  @ApiOperation({ summary: 'Cria um novo material' })
  @ApiResponse({ status: 201, description: 'Material criado com sucesso' })
  @ApiBody({
    schema: {
      example: {
        nome: 'Livro de Matemática',
        descricao: 'Livro de matemática do ensino médio',
        categoria: 'Livro',
        estado_conservacao: 'Novo',
        localizacao_fisica: 'Prateleira 1',
        uri_foto: 'https://www.google.com.br',
        numero_serie: '123456789',
      },
    },
  })
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materiaisService.create(createMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os materiais' })
  @ApiResponse({ status: 200, description: 'Lista de materiais' })
  findAll() {
    return this.materiaisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um material pelo id' })
  @ApiResponse({ status: 200, description: 'Material encontrado' })
  findOne(@Param('id') id: string) {
    return this.materiaisService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza informações um material' })
  @ApiResponse({ status: 200, description: 'Informações atualizada(s)' })
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materiaisService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um material' })
  @ApiResponse({ status: 200, description: 'Material deletado' })
  remove(@Param('id') id: string) {
    return this.materiaisService.remove(+id);
  }
}
