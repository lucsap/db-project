import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM Livros CASCADE`)

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO Livros (titulo, categoria, descricao, localizacao_fisica, estado_conservacao, autor, uri_capa_livro) VALUES
    ('Viagem ao Desconhecido', 'Aventura', 'Uma emocionante jornada por terras misteriosas', 'Estante A, Prateleira 3', 'Ótimo', 'A. A. Aventureiro', 'viagem_capa.jpg'),
    ('Segredos do Jardim', 'Romance', 'História de amor entre dois corações perdidos', 'Estante B, Prateleira 1', 'Excelente', 'R. Romântico', 'jardim_capa.jpg'),
    ('Descobrindo o Universo', 'Ciência', 'Exploração das maravilhas do cosmos e das estrelas', 'Estante C, Prateleira 2', 'Bom', 'C. Cientista', 'universo_capa.jpg');
    `
  )
}
