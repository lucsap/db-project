import { Knex } from 'knex';
import * as fs from 'fs';
import * as path from 'path';

export async function seed(knex: Knex): Promise<void> {

  function readImage(file: string): Buffer | null {
    const pathname = path.join(__dirname, '/images/materiais/', file);

    try {
      const buffer = fs.readFileSync(pathname);
      return buffer;
    } catch (error) {
      console.error('Erro ao ler imagem ', error)
      return null;
    }
  }

  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM MateriaisDidaticos CASCADE`)

  const imagens = ['caderno.png', 'pistola_cola_quente.png', 'tesoura.png'];
  for (const imagem of imagens) {
    const buffer = readImage(imagem);
    if (buffer) {
      if (imagem == imagens[0]) {
        await knex.raw(
          `
          INSERT INTO MateriaisDidaticos (nome, descricao, categoria, imagem, numero_serie, estado_conservacao, localizacao_fisica) VALUES
          ('Caderno', 'Caderno escolar simples', 'Caderno', ?, 123456, 'Ótimo', 'Biblioteca');
          `,[buffer]
        )
      }

      else if (imagem == imagens[1]) {
        await knex.raw(
          `
          INSERT INTO MateriaisDidaticos (nome, descricao, categoria, imagem, numero_serie, estado_conservacao, localizacao_fisica) VALUES
          ('Pistola de cola quente', 'Pistola de cola quente simples', 'Cola', ?, 654321, 'Bom', 'Biblioteca');
          `,[buffer]
        )
      }

      else if (imagem == imagens[2]) {
        await knex.raw(
          `
          INSERT INTO MateriaisDidaticos (nome, descricao, categoria, imagem, numero_serie, estado_conservacao, localizacao_fisica) VALUES
          ('Tesoura', 'Tesoura escolar simples', 'Tesoura', ?, 987654, 'Excelente', 'Sala de Aula 301');
          `,[buffer]
        )
      }
    }
  }

  // Inserts seed entries
  await knex.raw( ` INSERT INTO Itens("id_material_didatico", "tipo_item") SELECT id, 'material_didatico' FROM MateriaisDidaticos; `)
}
