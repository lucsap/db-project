import * as fs from 'fs';
import * as path from 'path';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateLivroDto } from './dto/create-livro.dto';
import { updateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class LivrosService {
  constructor(@InjectConnection() private readonly knex: Knex) {
    this.knex = knex;
  }

  async create(
    createLivroDto: CreateLivroDto,
    req: any,
    imagemLivro?: Express.Multer.File,
  ) {
    const user = req.user;

    if (user.role_id === 1) {
      throw new BadRequestException('Você não tem permissão para cadastrar livros');
    }
 
    let livro = {
      titulo: createLivroDto.titulo,
      categoria: createLivroDto.categoria,
      descricao: createLivroDto.descricao,
      localizacao_fisica: createLivroDto.localizacao_fisica,
      estado_conservacao: createLivroDto.estado_conservacao,
      autor: createLivroDto.autor,
      imagem_capa: createLivroDto.imagem_capa
    };
    if (imagemLivro) {
      const caminhoDestino = path.join(
        __dirname,
        '../../uploads',
        imagemLivro.originalname,
      );

      fs.writeFileSync(caminhoDestino, imagemLivro.buffer);
      const imagemBuffer = fs.readFileSync(caminhoDestino);
      livro.imagem_capa = imagemBuffer.toString('base64');
    }

    const resultado = await this.knex.raw(
      `INSERT INTO Livros (titulo, categoria, descricao, localizacao_fisica, estado_conservacao, autor) 
      VALUES (?, ?, ?, ?, ?, ?) RETURNING isbn`,
      [livro.titulo, livro.categoria, livro.descricao, livro.localizacao_fisica, livro.estado_conservacao, livro.autor]
    );

    const isbn = resultado.rows[0].isbn; // Agora deve funcionar corretamente


    if (resultado.rows && resultado.rows.length > 0) {
      const setItem = await this.knex.raw (
        `INSERT INTO Itens (id_livro, tipo_item) 
        SELECT isbn, 'livro' FROM Livros WHERE isbn = ${isbn}`,
      );

      return { 
        ...createLivroDto,
        success: true, 
        message: 'Livro cadastrado com sucesso!',
        setItem: setItem,
      };
    } else {
      // me de uma mensagem de erro melhor 
      throw new InternalServerErrorException('Erro ao cadastrar livro');
    }
  }

  async findAll(req: any) {
    const user = req.user;

    if (!user) {
      throw new BadRequestException('Usuário não autenticado');
    }

    const data = await this.knex.raw(`SELECT * FROM Livros`);

    return data.rows;
  }

  async findOne(isbn: number, req: any) {
    const user = req.user;

    if (!user) {
      throw new BadRequestException('Usuário não autenticado');
    }

    const livro = await this.knex.raw(
      `SELECT * FROM Livros WHERE ISBN = ${isbn}`,
    );
    if (!livro) {
      throw new NotFoundException('Livro não encontrado');
    }
    return livro.rows[0];
  }

  async update(isbn: number, updateLivroDto: updateLivroDto, req?: any) {
    const user = req.user;

    if (user.role_id === 1) {
      throw new BadRequestException('Você não tem permissão para atualizar livros');
    }

    const updateFields = {};

    if (updateLivroDto.titulo) {
      updateFields['titulo'] = updateLivroDto.titulo;
    }
    if (updateLivroDto.categoria) {
      updateFields['categoria'] = updateLivroDto.categoria;
    }
    if (updateLivroDto.descricao) {
      updateFields['descricao'] = updateLivroDto.descricao;
    }
    if (updateLivroDto.localizacao_fisica) {
      updateFields['localizacao_fisica'] = updateLivroDto.localizacao_fisica;
    }
    if (updateLivroDto.estado_conservacao) {
      updateFields['estado_conservacao'] = updateLivroDto.estado_conservacao;
    }
    if (updateLivroDto.autor) {
      updateFields['autor'] = updateLivroDto.autor;
    }

    const resultado = await this.knex('livros')
      .where('isbn', isbn)
      .update(updateFields);

    if (resultado) {
      return { 
        ...updateLivroDto,
        success: true,
        message: 'Livro atualizado com sucesso!'
      };
    }
    throw new NotFoundException('Livro não encontrado');
  }

  async remove(isbn: number, req?: any) {
    const user = req.user; 

    if (user.role_id === 1) {
      throw new BadRequestException('Você não tem permissão para excluir livros');
    }

    const resultado = await this.knex.raw(
      `DELETE FROM Livros WHERE ISBN = ${isbn};`,
    );
    if (resultado) {
      return { 
        message: 'Livro excluído com sucesso!',
        success: true
      };
    } else {
      throw new InternalServerErrorException('Erro ao excluir livro');
    }
  }
}
