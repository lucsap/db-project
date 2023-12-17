import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM MateriaisDidaticos CASCADE`)

  // Inserts seed entries
  await knex.raw(
    `
    INSERT INTO MateriaisDidaticos (nome, descricao, categoria, uri_foto_material, numero_serie, estado_conservacao, localizacao_fisica, data_aquisicao) VALUES
    ('Microscópio Biológico', 'Microscópio para estudos biológicos', 1, 'microscopio_biologico.jpg', 123456, 'Ótimo', 'Laboratório de Biologia', '2021-01-01'),
    ('Telescópio Astronômico', 'Telescópio para observações astronômicas', 2, 'telescopio_astronomico.jpg', 654321, 'Bom', 'Observatório Astronômico', '2021-01-01'),
    ('Quadro Interativo', 'Quadro interativo para aulas interativas', 3, 'quadro_interativo.jpg', 987654, 'Excelente', 'Sala de Aula 301', '2021-01-01');
    `
  )
}
