import { UpdateExpression } from './../../node_modules/@babel/types/lib/index-legacy.d';
import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { loginDto } from './dto/login.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {} 

  @Post('cadastro')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }
  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.usuariosService.login(loginDto.email, loginDto.senha);}

  @Get()
  findAll(){
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  Update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) { 
    return this.usuariosService.remove(+id);
  }

}
