import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('itens', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('descricao').notNullable();
    table.string('categoria').notNullable();
    table.string('estado_conservacao').notNullable();
    table.string('localizacao_fisica').notNullable();
    table.date('data_aquisicao').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('itens');
}
