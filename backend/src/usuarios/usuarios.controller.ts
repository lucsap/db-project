import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {} 

  @Post('cadastro')
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiBody({
    schema: {
      example: {
        nome: 'João',
        sobreNome: 'Silva',
        email: 'email@email.com',
        senha: '123456',
      }
    },
  })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  @Get()
  findAll(){
    return this.usuariosService.findAll();
  }

  @ApiOperation({ summary: 'Busca um usuário pelo id' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza informações um usuário' })
  @ApiResponse({ status: 200, description: 'Informações atualizada(s)' })
  @Patch(':id')
  Update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }
  
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado' })
  @Delete(':id')
  remove(@Param('id') id: string) { 
    return this.usuariosService.remove(+id);
  }
}
