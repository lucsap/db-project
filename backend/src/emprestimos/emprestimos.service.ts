import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { EmprestimoLivrosDto } from './dto/emprestimo-livros.dto';
import { EmprestimoMateriaisDto } from './dto/emprestimo-materiais.dto';

@Injectable()
export class EmprestimosService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async emprestimoLivros(req: any, emprestimoLivrosDto: EmprestimoLivrosDto) {
    const role = req.user;

    if (role.role_id !== 1) {
      throw new BadRequestException('Somente estudantes podem realizar empréstimos');
    }
    
    let emprestimo = await this.knex.raw(`SELECT * FROM Emprestimos WHERE status = true`);

    if (emprestimoLivrosDto.id_item !== null && emprestimoLivrosDto.id_item !== undefined) {
      emprestimo += ` AND id_item = ${emprestimoLivrosDto.id_item}`
    } else {
      emprestimo += ` AND id_item IS NULL`
    }

    const emprestimoExistente = await this.knex.raw(`SELECT * FROM Emprestimos WHERE id_item = ${emprestimoLivrosDto.id_item} AND status = true`);

    if (emprestimoExistente.rows.length > 0) {
      throw new BadRequestException('Livro já foi emprestado para outro usuário');
    }

    const item = await this.knex.raw(`SELECT * FROM Livros WHERE isbn = ${emprestimoLivrosDto.id_item}`);

    if (item.rows.length === 0) {
      throw new BadRequestException('Livro não encontrado');
    }

    if (item.rows[0].status === true) {
      throw new BadRequestException('Livro indisponível para empréstimo');
    }

    const formattedDate = new Date(emprestimoLivrosDto.data_devolucao_prevista).toISOString();

    const sql = `
      INSERT INTO Emprestimos (id_usuario, id_item, data_devolucao_prevista, status_devolucao) VALUES 
      (${emprestimoLivrosDto.id_usuario}, ${emprestimoLivrosDto.id_item}, '${formattedDate}', ${emprestimoLivrosDto.status})
    `

    await this.knex.raw(sql);
    const updateLivroSql = `
      UPDATE Livros SET status = true WHERE isbn = ${emprestimoLivrosDto.id_item} `;
    await this.knex.raw(updateLivroSql);

    return {
      ...emprestimoLivrosDto,
    };
  }

  async emprestimoMateriaisDidaticos(emprestimoMateriaisDto: EmprestimoMateriaisDto) {
    const emprestimoExistente = await this.knex.raw(`SELECT * FROM Emprestimos WHERE id_item = ${emprestimoMateriaisDto.id_item} AND status = true`);

    if (emprestimoExistente.rows.length > 0) {
      throw new BadRequestException('Material já está emprestado para outro usuário');
    }

    const item = await this.knex.raw(`SELECT * FROM MateriaisDidaticos WHERE id = ${emprestimoMateriaisDto.id_item}`);

    if (item.rows.length === 0) {
      throw new BadRequestException('Material não encontrado');
    }

    if (item.rows[0].status === true) {
      throw new BadRequestException('Material indisponível para empréstimo');
    }

    const formattedDate = new Date(emprestimoMateriaisDto.data_devolucao_prevista).toISOString();

    const sql = 
    `
      INSERT INTO Emprestimos (id_usuario, id_item, data_devolucao_prevista, status) VALUES 
      (${emprestimoMateriaisDto.id_usuario}, ${emprestimoMateriaisDto.id_item}, '${formattedDate}', ${emprestimoMateriaisDto.status})
    `

    await this.knex.raw(sql);

    return {
      ...emprestimoMateriaisDto,
    }
  }

  async findAll(req: any) {
    const userId = req.user.id;
    const data = await this.knex.raw(`SELECT * FROM Emprestimos WHERE id_usuario = ${userId}`);

    return data.rows;
  }

  async findOne(id: number) {
    const emprestimo = await this.knex.raw(`SELECT * FROM Emprestimos WHERE id = ${id}`);

    if (!emprestimo) {
      throw new BadRequestException('Empréstimo não encontrado');
    }

    return emprestimo;
  }

  async returnItem(req: any, updateEmprestimosDto: EmprestimoLivrosDto) {
    const userId = req.user.id;

    // Verifica se o usuário é o proprietário do livro
    const emprestimo = await this.knex.raw(`
      SELECT * FROM Emprestimos 
      WHERE id = ${updateEmprestimosDto.id_item} AND id_usuario = ${userId}
    `);

    if (emprestimo.rows.length === 0) {
      throw new BadRequestException('Empréstimo não encontrado ou não pertence a este usuário');
    }

    // Atualiza o registro de empréstimo para indicar que foi devolvido
    const updateEmprestimoSql = `
      UPDATE Emprestimos SET status = false, data_devolucao = CURRENT_TIMESTAMP 
      WHERE id = ${updateEmprestimosDto.id_item}
    `;
    await this.knex.raw(updateEmprestimoSql);

    // Atualiza o status do livro para indicar que está disponível novamente
    const updateLivroSql = `
      UPDATE Livros SET status = false WHERE isbn = ${updateEmprestimosDto.id_item}
    `;
    await this.knex.raw(updateLivroSql);

    return {
      success: true,
      ...emprestimo,
    };
  }

}
