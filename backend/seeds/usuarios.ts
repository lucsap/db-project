import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('Usuarios').del();

  // Inserts seed entries
  await knex('Usuarios').insert([
    {
      id: 1,
      nome: 'Veigh',
      sobrenome: 'Faz dinheiro',
      email: 'fino@email',
      uri_foto: 'foto',
      senha: 'senha',
      
    },
    {
      id: 2,
      nome: 'Caio',
      sobrenome: 'blaque',
      email: 'segredo@email',
      uri_foto: 'foto',
      senha: '123',

    },
    {
      id: 3,
      nome: 'matue',
      sobrenome: 'trinta',
      email: 'trinta@email',
      uri_foto: 'foto',
      senha: 'luz',

    },
  ]);
}
