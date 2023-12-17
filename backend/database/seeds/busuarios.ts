import { Knex } from 'knex';
import * as bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM Usuarios CASCADE`)

  // Adds the password as a hash
  const senha = bcrypt.hashSync('senha', 10)

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO Usuarios (nome, sobrenome, email, uri_foto, senha, role_id) VALUES
    ('Veigh', 'Faz dinheiro', 'fino@email.com', 'foto', '${senha}', 1),
    ('Caio', 'blaque', 'segredo@email.com', 'foto', '${senha}', 2),
    ('Matue', 'trinta', 'trinta@email.com', 'foto', '${senha}', 3);
    `
  )
}
