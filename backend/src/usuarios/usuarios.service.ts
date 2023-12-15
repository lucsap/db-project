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
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
  ) {
    this.knex = knex;
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      let createdUser = null;

      // Start a transaction
      await this.knex.transaction(async (trx) => {
        if (!createUsuarioDto.email || !createUsuarioDto.nome || !createUsuarioDto.sobrenome || !createUsuarioDto.senha) { throw new BadRequestException('Todos os campos são obrigatórios');
        }

        const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);

        let usuario = {
          ...createUsuarioDto,
          senha: hashedPassword,
        };

        // Insert the user within the transaction
        const result = await trx.raw(
          `
          INSERT INTO Usuarios (email, nome, senha, sobrenome) 
          VALUES (?, ?, ?, ?) RETURNING *
            `, 
          [usuario.email, usuario.nome, usuario.senha, usuario.sobrenome]
        );

        createdUser = result.rows[0];
      });

      if (createdUser) {
        return {
          usuario: {
            ...createdUser,
            senha: undefined,
          },
        };
      }

      return null;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new InternalServerErrorException('Falha ao criar usuário');
    }
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
    try {
      const result = await this.knex.raw('SELECT * FROM Usuarios');
      const usuarios = result.rows;

      return usuarios;
    } catch(error) {
      console.error('Erro ao buscar usuários');
      throw new InternalServerErrorException('Erro ao buscar usuários');
    }
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
    const updateFields = [];

    if (updateUsuarioDto.nome !== undefined) {
      updateFields.push(`nome = '${updateUsuarioDto.nome}'`);
    }
    if (updateUsuarioDto.sobrenome !== undefined) {
      updateFields.push(`sobrenome = '${updateUsuarioDto.sobrenome}'`);
    }
    if (updateUsuarioDto.email !== undefined) {
      updateFields.push(`email = '${updateUsuarioDto.email}'`);
    }
    if (updateUsuarioDto.senha !== undefined) {
      const hashedPassword = await bcrypt.hash(updateUsuarioDto.senha, 10);
      updateFields.push(`senha = '${hashedPassword}'`);
    }

    if (updateFields.length === 0) {
      // No fields to update, return success
      return { 
        success: true,
        message: "Nenhum campo foi atualizado"

      };
    }

    const updateQuery = `UPDATE Usuarios SET ${updateFields.join(', ')} WHERE id = ?`;
    const resultado = await this.knex.raw(updateQuery, [id]);

    if (resultado) {
      return { 
        success: true,
        ...updateUsuarioDto,
        senha: undefined,
      };
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
