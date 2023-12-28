import { Knex } from 'knex';
import * as fs from 'fs';
import * as path from 'path';

export async function seed(knex: Knex): Promise<void> {

  function readImage(file: string): Buffer | null {
    const pathname = path.join(__dirname, '/images/livros/', file);

    try {
      const buffer = fs.readFileSync(pathname);
      return buffer;
    } catch (error) {
      console.error('Erro ao ler imagem ', error)
      return null;
    }
  }

  // Deletes ALL existing entries
  await knex.raw
  (`
     DELETE FROM Livros CASCADE;
     DELETE FROM Itens CASCADE;`
  );
  
  const imagens = ['aprendendo_python.jpg', 'senhor_dos_aneis.jpg', 'inteligencia_artificial.jpg'];

  for (const imagem of imagens) {
    const buffer = readImage(imagem);
    if (buffer) {
      
      if (imagem == imagens[0]) {
        await knex.raw(
          `
          INSERT INTO Livros (categoria, descricao, autor, titulo, imagem_capa, localizacao_fisica, estado_conservacao) VALUES
          ('Tecnologia', 'Aprendendo Python', 'Mark Lutz', 'Aprendendo Python', ?, 'Prateleira1', 'Ótimo');
          `,[buffer]
        )
      }

      else if (imagem == imagens[1]) {
        await knex.raw(
          `
          INSERT INTO Livros (categoria, descricao, autor, titulo, imagem_capa, localizacao_fisica, estado_conservacao) VALUES
          ('Ficção', 'O Senhor dos Anéis', 'J.R.R. Tolkien', 'O Senhor dos Anéis', ?, 'Prateleira2', 'Bom');
          `,[buffer]
        )
      }

      else if (imagem == imagens[2]) {
        await knex.raw(
          `
          INSERT INTO Livros (categoria, descricao, autor, titulo, imagem_capa, localizacao_fisica, estado_conservacao) VALUES
          ('Tecnologia', 'Inteligência Artificial: Uma Abordagem Moderna', 'Stuart Russell, Peter Norvig', 'Inteligência Artificial', ?, 'Prateleira3', 'Excelente');
          `,[buffer]
        )
      }
    }
  }

  // Inserts into Itens
  await knex.raw(` INSERT INTO Itens("id_livro", "tipo_item") SELECT isbn, 'livro' FROM Livros; `)
}
