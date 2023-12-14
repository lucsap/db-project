import { Injectable } from '@nestjs/common';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class EmprestimosService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createEmprestimoDto: CreateEmprestimoDto) {
    return this.knex.raw(`
      INSERT INTO emprestimos (id_livro, id_usuario, data_emprestimo, data_devolucao, data_devolvido, status)
    `)
  }

  findAll() {
    return `This action returns all emprestimos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emprestimo`;
  }

  update(id: number, updateEmprestimoDto: UpdateEmprestimoDto) {
    return `This action updates a #${id} emprestimo`;
  }

  remove(id: number) {
    return `This action removes a #${id} emprestimo`;
  }
}
