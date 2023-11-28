import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw(`TRUNCATE TABLE Usuarios CASCADE`)

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO Usuarios (id, nome, sobrenome, email, uri_foto, senha) VALUES
    (1, 'Veigh', 'Faz dinheiro', 'fino@email.com, 'foto', 'senha');
    (2, 'Caio', 'blaque', 'segredo@email.com', 'foto', '123');
    (3, 'matue', 'trinta', 'trinta@email.com', 'foto', 'luz');
    `
  )
}
