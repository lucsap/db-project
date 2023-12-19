import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex.raw
  (`
     DELETE FROM Livros CASCADE;
     DELETE FROM Itens CASCADE;`
  );

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO Livros (categoria, descricao, autor, titulo, uri_capa_livro, localizacao_fisica, estado_conservacao) VALUES
    ('Tecnologia', 'Aprendendo Python', 'Mark Lutz', 'Aprendendo Python', 'aprendendo_python.jpg', 'Prateleira1', 'Ótimo'),
    ('Ficção', 'O Senhor dos Anéis', 'J.R.R. Tolkien', 'O Senhor dos Anéis', 'senhor_dos_aneis.jpg', 'Prateleira2', 'Bom'),
    ('Tecnologia', 'Inteligência Artificial: Uma Abordagem Moderna', 'Stuart Russell, Peter Norvig', 'Inteligência Artificial', 'ia_abordagem_moderna.jpg', 'Prateleira3', 'Excelente');

    INSERT INTO Itens("id_livro", "tipo_item")
    SELECT isbn, 'livro' FROM Livros;
    `
  )
}
