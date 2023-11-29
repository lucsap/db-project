import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('materiaisdidaticos').del();

  // Inserts seed entries
  await knex('materiaisdidaticos').insert([
    {
      id: 1,
      nome: 'pinto de borracha',
      descricao: 'pinto de borracha',
      categoria: 'brinquedo',
      estado_conservacao: 'bom',
      localizacao_fisica: 'sala 1',
      uri_foto_material: 'foto de um pinto de borracha',
      numero_serie: 123456789,
    },
    {
      id: 2,
      nome: 'xereca de borracha',
      descricao: 'xereca de borracha',
      categoria: 'brinquedo',
      estado_conservacao: 'bom',
      localizacao_fisica: 'sala 1',
      uri_foto_material: 'foto de uma xereca de borracha',
      numero_serie: 1234556789,
    },
    {
      id: 3,
      nome: 'cu de borracha',
      descricao: 'cu de borracha',
      categoria: 'brinquedo',
      estado_conservacao: 'bom',
      localizacao_fisica: 'sala 1',
      uri_foto_material: 'foto de um cu de borracha',
      numero_serie: 1234456789,
    },
  ]);
}
