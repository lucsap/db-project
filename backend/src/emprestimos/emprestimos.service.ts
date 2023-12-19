import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { EmprestimoDto } from './dto/emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo-livros.dto';

@Injectable()
export class EmprestimosService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async emprestimo(req: any, emprestimoDto: EmprestimoDto) {
    const role = req.user;

    if (role.role_id !== 1) {
      throw new BadRequestException('Somente estudantes podem realizar empréstimos');
    }

    const queryItem = await this.knex.raw(`SELECT tipo_item FROM Itens WHERE id = ${emprestimoDto.id_item}`);
    const tipoItem = queryItem.rows[0]?.tipo_item;

    if (!tipoItem) {
      throw new BadRequestException('Item não encontrado');
    }

    const item = await this.knex.raw(`SELECT * FROM Itens WHERE id_${tipoItem} = ${emprestimoDto.id_item} AND disponivel = TRUE`);

    if (item.rows.length === 0) {
      throw new BadRequestException(`${tipoItem} não encontrado ou indisponível para empréstimo`);
    }

    await this.knex.raw(`INSERT INTO Emprestimos (id_usuario, id_item) VALUES 
    (${emprestimoDto.id_usuario}, ${emprestimoDto.id_item})`
    );

    await this.knex.raw(`UPDATE Itens SET disponivel = FALSE WHERE id_${tipoItem} = ${emprestimoDto.id_item}`)
    
    return {
      ...emprestimoDto,
    };
  }

  async findAll(req: any) {
    const userId = req.user.id;
    const data = await this.knex.raw(`SELECT * FROM Emprestimos WHERE id_usuario = ${userId}`);

    return data.rows;
  }

  async findAllItens() {
    const data = await this.knex.raw(`SELECT * FROM Itens`);

    if (!data) {
      throw new BadRequestException('Nenhum item encontrado');
    }

    return data.rows;
  }

  async findOne(req: any) {
    const userId = req.user.id;
    const emprestimo = await this.knex.raw(`SELECT * FROM Emprestimos WHERE id = ${userId}`);

    if (!emprestimo) {
      throw new BadRequestException('Empréstimo não encontrado');
    }

    return emprestimo;
  }

  async returnItem(req: any, updateEmprestimosDto: UpdateEmprestimoDto) {
    const userId = req.user.id;

    // Verifica se o usuário é o proprietário do item emprestado
    const emprestimo = await this.knex.raw(`
      SELECT * FROM Emprestimos 
      WHERE id_item = ${updateEmprestimosDto.id_item} AND id_usuario = ${userId}
    `);

    if (emprestimo.rows.length === 0) {
      throw new BadRequestException('Empréstimo não encontrado ou não pertence a este usuário');
    }

    // Atualiza o registro de empréstimo para indicar que foi devolvido
    const updateEmprestimoSql = `
      UPDATE Emprestimos SET status = false, data_devolucao = CURRENT_TIMESTAMP 
      WHERE id_item = ${updateEmprestimosDto.id_item} AND id_usuario = ${userId}
    `;
    await this.knex.raw(updateEmprestimoSql);

    // Determina o tipo do item emprestado
    const queryItem = await this.knex.raw(`SELECT tipo_item FROM Itens WHERE id = ${updateEmprestimosDto.id_item}`);
    const tipoItem = queryItem.rows[0].tipo_item;

    // Atualiza o status do item para indicar que está disponível novamente
    const updateItemSql = `
      UPDATE Itens SET disponivel = TRUE WHERE id_${tipoItem} = ${updateEmprestimosDto.id_item}
    `;

    await this.knex.raw(updateItemSql);

    return {
      ...updateEmprestimosDto,
      success: true,
      message: `${tipoItem} devolvido com sucesso`,
    };
  }
}
