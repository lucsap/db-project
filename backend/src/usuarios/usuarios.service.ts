import * as fs from 'fs';
import * as path from 'path';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { loginDto } from './dto/login.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectConnection } from 'nest-knexjs';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
@Injectable()
export class UsuariosService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly jwtService: JwtService,
  ) {
    this.knex = knex;
  }
  async create(
    createUsuarioDto: CreateUsuarioDto,
    imagemPerfil?: Express.Multer.File,
  ) {
    if (!createUsuarioDto.email) {
      throw new BadRequestException('Email não informado');
    }
    if (!createUsuarioDto.nome) {
      throw new BadRequestException('Nome não informado');
    }
    if (!createUsuarioDto.sobrenome) {
      throw new BadRequestException('Sobrenome não informado');
    }
    if (!createUsuarioDto.senha) {
      throw new BadRequestException('Senha não informada');
    }

    let usuario = {
      nome: createUsuarioDto.nome,
      sobrenome: createUsuarioDto.sobrenome,
      email: createUsuarioDto.email,
      senha: createUsuarioDto.senha,
      uri_foto: null,
    };
    if (imagemPerfil) {
      const caminhoDestino = path.join(
        __dirname,
        '../../uploads',
        imagemPerfil.originalname,
      );

      fs.writeFileSync(caminhoDestino, imagemPerfil.buffer); //salva a imagem no servidor

      const imagemBuffer = fs.readFileSync(caminhoDestino); //converte a imagem para um buffer e insere na tabela de usuario
      usuario = { ...usuario, uri_foto: imagemBuffer };

      fs.unlinkSync(caminhoDestino); //deleta a imagem do servidor
    }

    const resultado = await this.knex('usuarios').insert(usuario);

    if (resultado) {
      return { success: true };
    }

    throw new InternalServerErrorException('Falha ao criar usuário');
  }

  async findByEmail(email: string) {
    const query = `
    SELECT * FROM usuarios WHERE email = ?
    `;
    const values = [email];
    const [usuario] = await this.knex.raw(query, values);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }
  async validatePassword(email: string, senha: string) {
    const usuario = await this.findByEmail(email);

    if (usuario && usuario.senha === senha) {
      return true;
    }
    throw new UnauthorizedException('Email ou senha incorretos');
  }
  async login(email: string, senha: string) {
    const usuario = await this.findByEmail(email);

    const payload = { email: usuario.email, sub: usuario.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }
  async findAll() {
    const query = `
    SELECT * FROM usuarios
    `;
    return await this.knex.raw(query);
  }
  async findOne(id: number) {
    const result = await this.knex.raw('SELECT * FROM usuarios WHERE id = ?', [
      id,
    ]);
    const usuario = result.rows[0]; // Acessar o primeiro resultado, se existir

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);

    const updateFields = {};

    if (updateUsuarioDto.nome !== undefined) {
      updateFields['nome'] = updateUsuarioDto.nome;
    }
    if (updateUsuarioDto.sobrenome !== undefined) {
      updateFields['sobrenome'] = updateUsuarioDto.sobrenome;
    }
    if (updateUsuarioDto.email !== undefined) {
      updateFields['email'] = updateUsuarioDto.email;
    }
    if (updateUsuarioDto.uri_foto !== undefined) {
      updateFields['uri_foto'] = updateUsuarioDto.uri_foto;
    }
    if (updateUsuarioDto.senha !== undefined) {
      updateFields['senha'] = updateUsuarioDto.senha;
    }
    if (updateUsuarioDto.is_admin !== undefined) {
      updateFields['is_admin'] = updateUsuarioDto.is_admin;
    }

    const resultado = await this.knex('usuarios')
      .where({ id })
      .update(updateFields);

    if (resultado) {
      return { success: true };
    }

    throw new NotFoundException('Usuário não encontrado');
  }
  async remove(id: number) {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    const values = [id];
    const resultado = await this.knex.raw(query, values);

    if (resultado.rowCount > 0) {
      return { success: true };
    }

    throw new NotFoundException('Usuário não encontrado');
  }
}
