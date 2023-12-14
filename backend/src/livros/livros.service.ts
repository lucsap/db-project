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

@Injectable()
export class LivrosService {
  constructor(@InjectConnection() private readonly knex: Knex) {
    this.knex = knex;
  }

  async create(
    createLivroDto: CreateLivroDto,
    imagemLivro?: Express.Multer.File,
  ) {
    if (!createLivroDto.titulo) {
      throw new BadRequestException('Título não informado');
    }
    if (!createLivroDto.categoria) {
      throw new BadRequestException('Categoria não informada');
    }
    if (!createLivroDto.descricao) {
      throw new BadRequestException('Descrição não informada');
    }
    if (!createLivroDto.localizacao_fisica) {
      throw new BadRequestException('Localização física não informada');
    }
    if (!createLivroDto.estado_conservacao) {
      throw new BadRequestException('Estado de conservação não informado');
    }
    if (!createLivroDto.autor) {
      throw new BadRequestException('Autor não informado');
    }
    let livro = {
      titulo: createLivroDto.titulo,
      categoria: createLivroDto.categoria,
      descricao: createLivroDto.descricao,
      localizacao_fisica: createLivroDto.localizacao_fisica,
      data_aquisicao: createLivroDto.data_aquisicao,
      estado_conservacao: createLivroDto.estado_conservacao,
      autor: createLivroDto.autor,
      uri_capa_livro: null,
    };
    if (imagemLivro) {
      const caminhoDestino = path.join(
        __dirname,
        '../../uploads',
        imagemLivro.originalname,
      );
      fs.writeFileSync(caminhoDestino, imagemLivro.buffer);
      const imagemBuffer = fs.readFileSync(caminhoDestino);
      livro.uri_capa_livro = imagemBuffer.toString('base64');
    }
    const resultado = await this.knex.raw(
      `INSERT INTO Livros (titulo, categoria, descricao, localizacao_fisica, estado_conservacao, autor) 
      VALUES ('${livro.titulo}', '${livro.categoria}', '${livro.descricao}', '${livro.localizacao_fisica}', '${livro.estado_conservacao}', '${livro.autor}')`,
    );
    if (resultado) {
      return { success: true, message: 'Livro cadastrado com sucesso!' };
    } else {
      throw new InternalServerErrorException('Erro ao criar livro');
    }
  }

  async findAll() {
    const data = await this.knex.raw(`SELECT * FROM Livros`);

    return data.rows;
  }

  async findOne(isbn: number) {
    const livro = await this.knex.raw(
      `SELECT * FROM Livros WHERE ISBN = ${isbn}`,
    );
    if (!livro) {
      throw new NotFoundException('Livro não encontrado');
    }
    return livro;
  }

  async update(isbn: number, createLivroDto: CreateLivroDto) {
    const updateFields = {};

    if (createLivroDto.titulo) {
      updateFields['titulo'] = createLivroDto.titulo;
    }
    if (createLivroDto.categoria) {
      updateFields['categoria'] = createLivroDto.categoria;
    }
    if (createLivroDto.descricao) {
      updateFields['descricao'] = createLivroDto.descricao;
    }
    if (createLivroDto.localizacao_fisica) {
      updateFields['localizacao_fisica'] = createLivroDto.localizacao_fisica;
    }
    if (createLivroDto.data_aquisicao) {
      updateFields['data_aquisicao'] = createLivroDto.data_aquisicao;
    }
    if (createLivroDto.estado_conservacao) {
      updateFields['estado_conservacao'] = createLivroDto.estado_conservacao;
    }
    if (createLivroDto.autor) {
      updateFields['autor'] = createLivroDto.autor;
    }

    const resultado = await this.knex('livros')
      .where('isbn', isbn)
      .update(updateFields);

    if (resultado) {
      return { success: true };
    }
    throw new NotFoundException('Livro não encontrado');
  }

  async remove(isbn: number) {
    const resultado = await this.knex.raw(
      `DELETE FROM Livros WHERE ISBN = ${isbn}`,
    );
    if (resultado) {
      return { success: true };
    } else {
      throw new InternalServerErrorException('Erro ao excluir livro');
    }
  }
}
