import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('itens', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('descricao').notNullable();
      table.string('categoria').notNullable();
      table.string('estado_conservacao').notNullable();
      table.string('localizacao_fisica').notNullable();
      table.date('data_aquisicao').notNullable();
    })
    .createTable('livros', (table) => {
      table.increments('ibsm').primary();
      table.string('autor').notNullable();
      table.specificType('uri_foto', 'bytea'); // o knex não suporta bytea naturalmente e esse é o tipo de dado para imagens no postgres
      table.integer('item_id').unsigned();
      table.foreign('item_id').references('itens.id').onDelete('CASCADE');
    })
    .createTable('materiaisDidaticos', (table) => {
      table.increments('id').primary();
      table.specificType('uri_foto', 'bytea'); // o knex não suporta bytea naturalmente e esse é o tipo de dado para imagens no postgres
      table.integer('numero_serie').notNullable();
      table.integer('item_id').unsigned();
      table.foreign('item_id').references('id').inTable('itens.id').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('itens');
}
