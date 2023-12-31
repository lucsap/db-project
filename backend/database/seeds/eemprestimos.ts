import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM Emprestimos CASCADE`)

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO Emprestimos (id_usuario, id_item) VALUES
    (1, 1),
    (2, 2),
    (3, 3);
    `
  )
}
