import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM Emprestimos CASCADE`)

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO Emprestimos (id_usuario, data_emprestimo, data_devolucao_prevista, status_devolucao) VALUES
    (1, '2023-01-15', '2023-01-14', true),
    (2, '2023-02-15', '2023-02-14', false),
    (3, '2023-03-15', '2023-03-14', true);
    `
  )
}
