import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS Roles (
      "id" SERIAL PRIMARY KEY,
      "nome" varchar(255) NOT NULL,
      CONSTRAINT "uc_roles_nome" UNIQUE ("nome")
    );

    CREATE TABLE IF NOT EXISTS Usuarios (
      "id" SERIAL PRIMARY KEY,
      "nome" varchar(255) NOT NULL,
      "sobrenome" varchar(255) NOT NULL,
      "role_id" int DEFAULT 1 NOT NULL,
      "uri_foto" bytea,
      "senha" varchar(64),
      "email" varchar(255) NOT NULL,
      CONSTRAINT "uc_usuarios_nome" UNIQUE ("nome"),
      CONSTRAINT "fk_usuarios_role" FOREIGN KEY ("role_id") REFERENCES Roles ("id")
    );

    CREATE TABLE IF NOT EXISTS MateriaisDidaticos (
      "id" SERIAL PRIMARY KEY,
      "nome" varchar(255) NOT NULL,
      "descricao" varchar(255) NOT NULL,
      "categoria" varchar(255) NOT NULL,
      "imagem" bytea,
      "numero_serie" int NOT NULL,
      "estado_conservacao" varchar(255) NOT NULL,
      "localizacao_fisica" varchar(255) NOT NULL,
      "data_aquisicao" date DEFAULT CURRENT_DATE
    );

    CREATE TABLE IF NOT EXISTS Livros (
      "isbn" SERIAL PRIMARY KEY,
      "categoria" varchar(255) NOT NULL,
      "descricao" varchar(255) NOT NULL,
      "autor" varchar(255) NOT NULL,
      "titulo" varchar(255) NOT NULL,
      "imagem_capa" bytea,
      "localizacao_fisica" varchar(255) NOT NULL,
      "estado_conservacao" varchar(255) NOT NULL,
      "data_aquisicao" date DEFAULT CURRENT_DATE,
      CONSTRAINT "uc_livros_isbn" UNIQUE ("isbn")
    );

    CREATE TABLE IF NOT EXISTS Itens (
      "id" SERIAL PRIMARY KEY,
      "id_livro" int,
      "id_material_didatico" int,
      "tipo_item" varchar(255) NOT NULL CHECK (tipo_item IN ('livro', 'material_didatico')),
      "disponivel" boolean DEFAULT TRUE,
      CONSTRAINT "fk_itens_id_livro" FOREIGN KEY ("id_livro") REFERENCES Livros ("isbn") ON DELETE CASCADE,
      CONSTRAINT "fk_itens_id_material_didatico" FOREIGN KEY ("id_material_didatico") REFERENCES MateriaisDidaticos ("id")
    );

    CREATE TABLE IF NOT EXISTS Emprestimos (
      "id" SERIAL PRIMARY KEY,
      "id_usuario" int NOT NULL,
      "id_item" int NOT NULL,
      "data_emprestimo" date DEFAULT CURRENT_DATE,
      "data_devolucao_prevista" date DEFAULT CURRENT_DATE + 14,
      "status" boolean DEFAULT FALSE,
      "data_devolucao" date,
      CONSTRAINT "fk_emprestimos_id_usuario" FOREIGN KEY ("id_usuario") REFERENCES Usuarios ("id"),
      CONSTRAINT "fk_emprestimos_id_item" FOREIGN KEY ("id_item") REFERENCES Itens ("id") ON DELETE CASCADE
    );
`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(
    `
      DROP TABLE IF EXISTS Roles CASCADE;
      DROP TABLE IF EXISTS Usuarios CASCADE;
      DROP TABLE IF EXISTS Emprestimos CASCADE;
      DROP TABLE IF EXISTS Livros CASCADE;
      DROP TABLE IF EXISTS MateriaisDidaticos CASCADE;
      DROP TABLE IF EXISTS Itens CASCADE;
    `,
  );
}
