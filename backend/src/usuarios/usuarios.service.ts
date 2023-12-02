import * as fs from 'fs';
import * as path from 'path';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
  ) {
    this.knex = knex;
  }

  async create (
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
    if (!createUsuarioDto.role) {
      throw new BadRequestException('Role não informada');
    }
    if (!createUsuarioDto.uri_foto) {
      throw new BadRequestException('Foto não informada');
    }

    let usuario = {
      nome: createUsuarioDto.nome,
      sobrenome: createUsuarioDto.sobrenome,
      email: createUsuarioDto.email,
      senha: createUsuarioDto.senha,
      role: createUsuarioDto.role,
      uri_foto: createUsuarioDto.uri_foto,

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

    const resultado = await this.knex.raw(`INSERT INTO Usuarios (email, nome, senha, sobrenome, uri_foto, role) 
    VALUES ('${usuario.email}', '${usuario.nome}', '${usuario.senha}', '${usuario.sobrenome}', '${usuario.uri_foto}', '${usuario.role}');
    `);

    if (resultado) {
      return { success: true };
    }

    throw new InternalServerErrorException('Falha ao criar usuário');
  }

  async findByEmail(email: string) {
    try {
      const result = await this.knex.raw('SELECT * FROM Usuarios WHERE email = ?', [ email ]);
      const usuario = result.rows[0]; // Acessar o primeiro resultado, se existir
      return usuario;
    } catch (error) {
      console.error('Erro ao buscar usuário');
      throw new InternalServerErrorException('Erro ao buscar usuário');
    }
  }

  async findAll() {
    const result = await this.knex.raw('SELECT * FROM Usuarios');
    const usuarios = result.rows;
    return usuarios
  }

  async findOne(id: number) {
    const result = await this.knex.raw('SELECT * FROM Usuarios WHERE id = ?', [
      id,
    ]);
    const usuario = result.rows[0]; // Acessar o primeiro resultado, se existir

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    const knex = this.knex;

    if (updateUsuarioDto.nome !== undefined) {
      knex.raw('UPDATE Usuarios SET nome = ? WHERE id = ?', [updateUsuarioDto.nome, id]);
    }
    if (updateUsuarioDto.sobrenome !== undefined) {
      knex.raw('UPDATE Usuarios SET sobrenome = ? WHERE id = ?', [updateUsuarioDto.sobrenome, id]);
    }
    if (updateUsuarioDto.email !== undefined) {
      knex.raw('UPDATE Usuarios SET email = ? WHERE id = ?', [updateUsuarioDto.email, id]);
    }
    if (updateUsuarioDto.uri_foto !== undefined) {
      knex.raw('UPDATE Usuarios SET uri_foto = ? WHERE id = ?', [updateUsuarioDto.uri_foto, id]);
    }
    if (updateUsuarioDto.senha !== undefined) {
      knex.raw('UPDATE Usuarios SET senha = ? WHERE id = ?', [updateUsuarioDto.senha, id]);
    }
    if (updateUsuarioDto.role !== undefined) {
      knex.raw('UPDATE Usuarios SET role = ? WHERE id = ?', [updateUsuarioDto.role, id]);
    }

    const resultado = await this.knex.raw(
      'UPDATE Usuarios SET nome = ?, sobrenome = ?, email = ?, uri_foto = ?, senha = ?, role = ? WHERE id = ?',
        [
        updateUsuarioDto.nome,
        updateUsuarioDto.sobrenome,
        updateUsuarioDto.email,
        updateUsuarioDto.uri_foto,
        updateUsuarioDto.senha,
        updateUsuarioDto.role,
        id,
      ]
    );

    if (resultado) {
      return { success: true };
    }

    throw new NotFoundException('Usuário não encontrado');
  }

  async remove(id: number) {
    const query = 'DELETE FROM Usuarios WHERE id = ?';
    const values = [id];
    const resultado = await this.knex.raw(query, values);

    if (resultado.rowCount > 0) {
      return { success: true };
    }

    throw new NotFoundException('Usuário não encontrado');
  }
}
