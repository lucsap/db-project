import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('usuarios', (table) => {
    table.string('nome').notNullable();
    table.string('sobrenome').notNullable();
    table.string('email').notNullable();
    table.string('senha').notNullable();
    table.boolean('is_admin').defaultTo(false);
    table.specificType('uri_foto', 'bytea'); // o knex não suporta bytea naturalmente e esse é o tipo de dado para imagens no postgres
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('usuarios');
}
