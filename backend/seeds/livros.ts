import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('livros').del();

  // Inserts seed entries
  await knex('livros').insert([
    {
      isbn: 1,
      titulo: 'Pica',
      categoria: 'Erotico',
      descricao: 'Muita pica na sua cara',
      localizacao_fisica: 'Nas minhas carça',
      
      estado_conservacao: 'SEXO',
      autor: 'Kama Sutra da Silva',
      uri_capa_livro: 'foto',
    },
    {
      isbn: 2,
      titulo: 'Xereca',
      categoria: 'Erotico',
      descricao: 'Muita xereca na sua cara',
      localizacao_fisica: 'Nas minhas carça',
      
      estado_conservacao: 'SEXO',
      autor: 'Kama Sutra da Silva',
      uri_capa_livro: 'foto',
    },
    {
      isbn: 3,
      titulo: 'Cu',
      categoria: 'Erotico',
      descricao: 'Muito cu na sua cara',
      localizacao_fisica: 'Nas minhas carça',
      
      estado_conservacao: 'SEXO',
      autor: 'Kama Sutra da Silva',
      uri_capa_livro: 'foto',
    },
  ]);
}
