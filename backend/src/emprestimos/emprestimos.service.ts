import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { EmprestimoLivrosDto } from './dto/emprestimo-livros.dto';
import { UpdateEmprestimoLivrosDto } from './dto/update-emprestimo-livros.dto';

@Injectable()
export class EmprestimosService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async emprestimoLivros(emprestimoLivrosDto: EmprestimoLivrosDto) {
    const item = await this.knex.raw(`SELECT * FROM Livros WHERE isbn = ${emprestimoLivrosDto.id_item}`);

    if (!item) {
      throw new Error('Item não encontrado');
    }

    if (item === false) {
      throw new Error('Item indisponível para empréstimo');
    }

    const formattedDate = new Date(emprestimoLivrosDto.data_devolucao_prevista).toISOString().slice(0, 10);

    const sql = `
      INSERT INTO Emprestimos (id_usuario, id_item, data_devolucao_prevista, status_devolucao) VALUES 
      (${emprestimoLivrosDto.id_usuario}, ${emprestimoLivrosDto.id_item}, '${formattedDate}', ${emprestimoLivrosDto.status_devolucao})
    `

    await this.knex.raw(sql);

    return {
      ...emprestimoLivrosDto,
    }
  }

  async findAll() {
    const data = await this.knex.raw(`SELECT * FROM Emprestimos`);

    return data.rows;
  }

  findOne(id: number) {
    return `This action returns a #${id} emprestimo`;
  }

  update(id: number, updateEmprestimoDto: UpdateEmprestimoLivrosDto) {
    return `This action updates a #${id} emprestimo`;
  }

  remove(id: number) {
    return `This action removes a #${id} emprestimo`;
  }
}
