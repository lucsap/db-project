import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM Livros CASCADE`)

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO Livros (isbn, categoria, descricao, autor, titulo, uri_capa_livro, localizacao_fisica, estado_conservacao) VALUES
    (123456789, 1, 'Aprendendo Python', 'Mark Lutz', 'Aprendendo Python', 'aprendendo_python.jpg', 'Prateleira1', 'Ótimo'),
    (987654321, 2, 'O Senhor dos Anéis', 'J.R.R. Tolkien', 'O Senhor dos Anéis', 'senhor_dos_aneis.jpg', 'Prateleira2', 'Bom'),
    (555555555, 3, 'Inteligência Artificial: Uma Abordagem Moderna', 'Stuart Russell, Peter Norvig', 'Inteligência Artificial', 'ia_abordagem_moderna.jpg', 'Prateleira3', 'Excelente');
    `
  )
}
