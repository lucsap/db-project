import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

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
        sobrenome: 'Silva',
        email: 'email@email.com',
        senha: '123456',
      }
    },
  })
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuariosService.create(createUsuarioDto);
  }

  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  @Get()
  async findAll(){
    return await this.usuariosService.findAll();
  }

  @ApiOperation({ summary: 'Busca um usuário pelo id' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usuariosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza informações um usuário' })
  @ApiResponse({ status: 200, description: 'Informações atualizada(s)' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuariosService.update(+id, updateUsuarioDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado' })
  @Delete(':id')
  async remove(@Req() req: any) { 
    return await this.usuariosService.remove(req);
  }
}
