-- Inserção de dados adicionais na tabela Usuarios
INSERT INTO Usuarios (id, nome, sobrenome, is_admin, uri_foto, senha, email)
VALUES
    (4, 'Usuario3', 'Sobrenome3', false, 'http://urifotousuario3.com', 'hashed_password_usuario3', 'usuario3@example.com'),
    (5, 'Usuario4', 'Sobrenome4', false, 'http://urifotousuario4.com', 'hashed_password_usuario4', 'usuario4@example.com'),
    (6, 'Usuario5', 'Sobrenome5', false, 'http://urifotousuario5.com', 'hashed_password_usuario5', 'usuario5@example.com');

-- Inserção de dados adicionais na tabela Emprestimos
INSERT INTO Emprestimos (id_usuario, id_item, data_emprestimo, data_devolucao_prevista, status)
VALUES
    (4, 3, '2023-04-04', '2023-05-04', true),
    (5, 1, '2023-04-05', '2023-05-05', false),
    (6, 2, '2023-04-06', '2023-05-06', true);

-- Inserção de dados adicionais na tabela CadastroDeItens
INSERT INTO CadastroDeItens (id_item, tipo, data_aquisicao, categoria, descricao, titulo, autor, uri_foto, numero_serie)
VALUES
    (4, 'Livro', '2023-04-01', 'Suspense', 'Descrição do Livro 3', 'Livro 3', 'Autor 3', 'http://urifotolivro3.com', null),
    (5, 'Material Didático', '2023-04-02', 'Ciência', 'Descrição do Material 2', null, null, 'http://urifotomaterial2.com', 345678),
    (6, 'Livro', '2023-04-03', 'Romance', 'Descrição do Livro 4', 'Livro 4', 'Autor 4', 'http://urifotolivro4.com', null);

-- Inserção de dados adicionais na tabela Itens
INSERT INTO Itens (id, id_material, id_isbn, localizacao_fisica, data_aquisicao, categoria, estado_conservacao, descricao)
VALUES
    (4, null, 4, 'Estante D', '2023-04-01', 'Suspense', 'Bom', 'Descrição do Livro 3'),
    (5, 4, null, 'Armário E', '2023-04-02', 'Ciência', 'Ótimo', 'Descrição do Material 2'),
    (6, null, 5, 'Estante F', '2023-04-03', 'Romance', 'Regular', 'Descrição do Livro 4');

-- Inserção de dados adicionais na tabela Livros
INSERT INTO Livros (ISBN, autor, titulo, uri_capa_livro)
VALUES
    (3, 'Autor 3', 'Livro 3', 'http://uricapalivro3.com'),
    (4, 'Autor 4', 'Livro 4', 'http://uricapalivro4.com');
    (5, 'Autor 5', 'Livro 5', 'http://uricapalivro5.com');

-- Inserção de dados adicionais na tabela MateriaisDidadicos
INSERT INTO MateriaisDidaticos (id, uri_foto_material, numero_serie)
VALUES
    (3, 'http://urifotomaterial3.com', 567890),
    (4, 'http://urifotomaterial4.com', 123456);
    (5, 'http://urifotomaterial5.com', 234567);

