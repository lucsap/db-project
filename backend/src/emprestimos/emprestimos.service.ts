import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { EmprestimoLivrosDto } from './dto/emprestimo-livros.dto';
import { EmprestimoMateriaisDto } from './dto/emprestimo-materiais.dto';

@Injectable()
export class EmprestimosService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async emprestimoLivros(emprestimoLivrosDto: EmprestimoLivrosDto) {
    const emprestimoExistente = await this.knex.raw(`SELECT * FROM Emprestimos WHERE id_item = ${emprestimoLivrosDto.id_item} AND status_devolucao = true`);

    if (emprestimoExistente.rows.length > 0) {
      throw new BadRequestException('Livro já foi emprestado para outro usuário');
    }

    const item = await this.knex.raw(`SELECT * FROM Livros WHERE isbn = ${emprestimoLivrosDto.id_item}`);

    if (item.rows.length === 0) {
      throw new BadRequestException('Livro não encontrado');
    }

    if (item.rows[0].status_devolucao === true) {
      throw new BadRequestException('Livro indisponível para empréstimo');
    }

    const formattedDate = new Date(emprestimoLivrosDto.data_devolucao_prevista).toISOString();

    const sql = `
      INSERT INTO Emprestimos (id_usuario, id_item, data_devolucao_prevista, status_devolucao) VALUES 
      (${emprestimoLivrosDto.id_usuario}, ${emprestimoLivrosDto.id_item}, '${formattedDate}', ${emprestimoLivrosDto.status_devolucao})
    `

    await this.knex.raw(sql);

    return {
      ...emprestimoLivrosDto,
    }
  }

  async emprestimoMateriaisDidaticos(emprestimoMateriaisDto: EmprestimoMateriaisDto) {
    const emprestimoExistente = await this.knex.raw(`SELECT * FROM Emprestimos WHERE id_item = ${emprestimoMateriaisDto.id_item} AND status_devolucao = true`);

    if (emprestimoExistente.rows.length > 0) {
      throw new BadRequestException('Material já está emprestado para outro usuário');
    }

    const item = await this.knex.raw(`SELECT * FROM MateriaisDidaticos WHERE id = ${emprestimoMateriaisDto.id_item}`);

    if (item.rows.length === 0) {
      throw new BadRequestException('Material não encontrado');
    }

    if (item.rows[0].status_devolucao === true) {
      throw new BadRequestException('Material indisponível para empréstimo');
    }

    const formattedDate = new Date(emprestimoMateriaisDto.data_devolucao_prevista).toISOString();

    const sql = 
    `
      INSERT INTO Emprestimos (id_usuario, id_item, data_devolucao_prevista, status_devolucao) VALUES 
      (${emprestimoMateriaisDto.id_usuario}, ${emprestimoMateriaisDto.id_item}, '${formattedDate}', ${emprestimoMateriaisDto.status_devolucao})
    `

    await this.knex.raw(sql);

    return {
      ...emprestimoMateriaisDto,
    }
  }

  async findAll() {
    const data = await this.knex.raw(`SELECT * FROM Emprestimos`);

    return data.rows;
  }

  async findOne(id: number) {
    const emprestimo = await this.knex.raw(`SELECT * FROM Emprestimos WHERE id = ${id}`);

    if (!emprestimo) {
      throw new BadRequestException('Empréstimo não encontrado');
    }

    return emprestimo;
  }

  async returnItem(id: number) {
    const emprestimo = await this.knex.raw(`SELECT * FROM Emprestimos WHERE id = ${id}`);

    if (!emprestimo) {
      throw new BadRequestException('Empréstimo não encontrado');
    }

    const sql = `
      UPDATE Emprestimos SET status_devolucao = false, data_devolucao = CURRENT_TIMESTAMP WHERE id = ${id}
    `

    await this.knex.raw(sql);

    return {
      success: true,
    }
  }
}
