import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM Emprestimos CASCADE`)

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO Emprestimos (id_usuario, id_item, data_devolucao_prevista) VALUES
    (1, 1, '2023-01-14'),
    (2, 2, '2023-02-14'),
    (3, 3, '2023-03-14');
    `
  )
}
