import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('livros', (table) => {
    table.increments('ibsm').primary();
    table.string('autor').notNullable();
    table.specificType('uri_foto', 'bytea'); // o knex não suporta bytea naturalmente e esse é o tipo de dado para imagens no postgres
    table.integer('item_id').unsigned();
    table.foreign('item_id').references('itens.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('livros');
}
