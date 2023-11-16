CREATE TABLE "Usuarios"(
    "id" int   NOT NULL,
    "nome" varchar(255)   NOT NULL,
    "sobrenome" varchar(255)   NOT NULL,
    "is_admin" boolean   NOT NULL,
    "uri_foto" varchar(255)   NOT NULL,
    "senha" varchar(64)   NOT NULL,
    "email" varchar(255)   NOT NULL,
    CONSTRAINT "pk_usuarios" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_usuarios_nome" UNIQUE (
        "nome"
    )
);

CREATE TABLE "Emprestimos"(
    "id_usuario" int   NOT NULL,
    "id_item" int   NOT NULL,
    "data_emprestimo" date   NOT NULL,
    "data_devolucao_prevista" date   NOT NULL,
    "status" boolean   NOT NULL
);

CREATE TABLE "Devolucoes"(
    "id_usuario" int   NOT NULL,
    "id_item" int   NOT NULL
);

CREATE TABLE "CadastroDeItens" (
    "id_item" int   NOT NULL,
    "tipo" varchar(255)   NOT NULL,
    "data_aquisicao" date   NOT NULL,
    "categoria" varchar(255)   NOT NULL,
    "descricao" varchar(255)   NOT NULL,
    "titulo" varchar(255)   NOT NULL,
    "autor" varchar(255)   NOT NULL,
    "uri_foto" varchar(255)   NOT NULL,
    "numero_serie" int   NOT NULL
);

CREATE TABLE "Itens" (
    "id" int   NOT NULL,
    "id_material" int   NOT NULL,
    "id_isbn" int   NOT NULL,
    "localizacao_fisica" varchar(255)   NOT NULL,
    "data_aquisicao" date   NOT NULL,
    "categoria" varchar(255)   NOT NULL,
    "estado_conservacao" varchar(255)   NOT NULL,
    "descricao" varchar(255)   NOT NULL,
    CONSTRAINT "pk_itens" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Livros" (
    "ISBN" int   NOT NULL,
    "autor" varchar(255)   NOT NULL,
    "titulo" varchar(255)   NOT NULL,
    "uri_capa_livro" varchar(255)   NOT NULL,
    CONSTRAINT "pk_livros" PRIMARY KEY (
        "ISBN"
     )
);

CREATE TABLE "MateriaisDidaticos" (
    "id" int   NOT NULL,
    "uri_foto_material" varchar(255)   NOT NULL,
    "numero_serie" int   NOT NULL,
    CONSTRAINT "pk_materiaisDidadicos" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "Emprestimos" ADD CONSTRAINT "fk_emprestimos_id_usuario" FOREIGN KEY("id_usuario")
REFERENCES "Usuarios" ("id");

ALTER TABLE "Emprestimos" ADD CONSTRAINT "fk_emprestimos_id_item" FOREIGN KEY("id_item")
REFERENCES "Itens" ("id");

ALTER TABLE "Devolucoes" ADD CONSTRAINT "fk_devolucoes_id_usuario" FOREIGN KEY("id_usuario")
REFERENCES "Usuarios" ("id");

ALTER TABLE "Devolucoes" ADD CONSTRAINT "fk_devolucoes_id_item" FOREIGN KEY("id_item")
REFERENCES "Itens" ("id");

ALTER TABLE "CadastroDeItens" ADD CONSTRAINT "uc_cadastroDeItens_id_item" UNIQUE ("id_item");

ALTER TABLE "Itens" ADD CONSTRAINT "fk_itens_id" FOREIGN KEY("id")
REFERENCES "CadastroDeItens" ("id_item");

ALTER TABLE "Itens" ADD CONSTRAINT "fk_itens_id_material" FOREIGN KEY("id_material")
REFERENCES "MateriaisDidaticos" ("id");

ALTER TABLE "Itens" ADD CONSTRAINT "fk_itens_id_isbn" FOREIGN KEY("id_isbn")
REFERENCES "Livros" ("ISBN");

