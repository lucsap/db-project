import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM MateriaisDidaticos CASCADE`)

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO MateriaisDidaticos (id, nome, descricao, categoria, estado_conservacao, localizacao_fisica, uri_foto_material, numero_serie) VALUES
    (1, 'Quebra-Cabeça Educativo', 'Quebra-Cabeça educativo para crianças', 'brinquedo', 'excelente', 'Sala de Recreação', 'quebracabeca_foto.jpg', 987654321),
    (2, 'Kit de Arte Infantil', 'Kit com tintas e pincéis para estimular a criatividade', 'brinquedo', 'ótimo', 'Sala de Artes', 'arte_infantil_foto.jpg', 876543210),
    (3, 'Conjunto de Experimentos Científicos', 'Material para realizar experimentos educativos', 'brinquedo', 'bom', 'Laboratório Didático', 'experimentos_foto.jpg', 765432109);
    `
  )
}
