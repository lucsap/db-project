import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM Roles CASCADE`)

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO Roles VALUES
    (1, 'estudante'),
    (2, 'membro'),
    (3, 'admin');
    `
  )
}
