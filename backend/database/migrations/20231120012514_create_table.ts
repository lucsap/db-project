import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
  DROP TYPE IF EXISTS role;
  CREATE TYPE role AS ENUM ('admin', 'estudante', 'laboratorio');

    CREATE TABLE IF NOT EXISTS Usuarios(
        "id" SERIAL   NOT NULL,
        "nome" varchar(255)   NOT NULL,
        "sobrenome" varchar(255)   NOT NULL,
        "role" role NOT NULL,
        "uri_foto" bytea   NOT NULL,
        "senha" varchar(64)   NOT NULL,
        "email" varchar(255)   NOT NULL,
        CONSTRAINT "pk_usuarios" PRIMARY KEY (
            "id"
         ),
        CONSTRAINT "uc_usuarios_nome" UNIQUE (
            "nome"
        )
    );

    CREATE TABLE IF NOT EXISTS Emprestimos(
        "id_usuario" int   NOT NULL,
        "id_item" int   NOT NULL,
        "data_emprestimo" date   NOT NULL,
        "data_devolucao_prevista" date   NOT NULL,
        "status" boolean   NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Devolucoes(
        "id_usuario" int   NOT NULL,
        "id_item" int   NOT NULL
    );

    CREATE TABLE IF NOT EXISTS CadastroDeItens (
        "id_item" int   NOT NULL,
        "tipo" varchar(255)   NOT NULL,
        "data_aquisicao" date   NOT NULL,
        "categoria" varchar(255)   NOT NULL,
        "descricao" varchar(255)   NOT NULL,
        "titulo" varchar(255)   NOT NULL,
        "autor" varchar(255)   NOT NULL,
        "uri_foto" bytea   ,
        "numero_serie" int   NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Livros (
        "isbn" SERIAL   NOT NULL,
        "autor" varchar(255)   NOT NULL,
        "titulo" varchar(255)   NOT NULL,
        "uri_capa_livro" bytea   ,
        "categoria" varchar(255)   NOT NULL,
        "localizacao_fisica" varchar(255)   NOT NULL,
        "estado_conservacao" varchar(255)   NOT NULL,
        "descricao" varchar(255)   NOT NULL
    );

    CREATE TABLE IF NOT EXISTS MateriaisDidaticos (
        "id" SERIAL   NOT NULL,
        "nome" varchar(255)   NOT NULL,
        "uri_foto_material" bytea   ,
        "numero_serie" int   NOT NULL,
        "localizacao_fisica" varchar(255)   NOT NULL,
        "data_aquisicao" date ,
        "categoria" varchar(255)   NOT NULL,
        "estado_conservacao" varchar(255)   NOT NULL,
        "descricao" varchar(255)   NOT NULL
    );

    ALTER TABLE Emprestimos ADD CONSTRAINT "fk_emprestimos_id_usuario" FOREIGN KEY("id_usuario")
    REFERENCES Usuarios ("id");

    ALTER TABLE Devolucoes ADD CONSTRAINT "fk_devolucoes_id_usuario" FOREIGN KEY("id_usuario")
    REFERENCES Usuarios ("id");

    ALTER TABLE Livros ADD CONSTRAINT "uc_livros_isbn" UNIQUE ("isbn");
`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(
    `
      DROP TABLE IF EXISTS Usuarios CASCADE;
      DROP TABLE IF EXISTS Emprestimos CASCADE;
      DROP TABLE IF EXISTS Devolucoes CASCADE;
      DROP TABLE IF EXISTS Livros CASCADE;
      DROP TABLE IF EXISTS MateriaisDidaticos CASCADE;
    `,
  );
}
