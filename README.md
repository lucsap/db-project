<div align="center">
  <img src="https://i.pinimg.com/originals/ef/24/c7/ef24c74beefe5ed3c1ce0bed3ccac4cc.png"  height=300>
</div>
<h1 align="center"> Trabalho de banco de dados </h1>
<div>
  <img alt="GitHub" src="https://img.shields.io/github/license/lucsap/db-project">
  <img alt="Status" src="https://img.shields.io/badge/status-In_progress-green">
</div>

# :gear: Sistema de Gerenciamento de Livros e Materiais Didáticos

Este projeto tem como objetivo desenvolver um Sistema de Informação dedicado ao gerenciamento de livros de ensino e materiais didáticos em um laboratório. Com a finalidade de atender tanto estudantes quanto professores, nosso sistema permitirá o acesso organizado e o empréstimo desses recursos por meio de uma plataforma computacional.

## :white_check_mark: Funcionalidades Principais

- :books: **Cadastro de Livros e Materiais Didáticos:** Os administradores do sistema poderão inserir informações detalhadas sobre os livros e materiais disponíveis no laboratório.

- :mag: **Pesquisa e Consulta:** Todos os usuários terão a capacidade de buscar e visualizar informações sobre os recursos educacionais disponíveis.

- :arrows_counterclockwise: **Empréstimo e Devolução:** Membros do laboratório poderão solicitar o empréstimo de livros e materiais, com um sistema de controle de prazo de devolução.

- :lock: **Níveis de Acesso:** O sistema será projetado com diferentes níveis de acesso, garantindo que apenas membros autorizados possam realizar empréstimos.

## :building_construction: Estrutura do Projeto

- :bar_chart: **Regras de Negócio:** As regras de negócio definem as diretrizes e políticas que regem o funcionamento do sistema, incluindo quem pode acessar, como os empréstimos são autorizados e quais são as políticas de devolução.

- :floppy_disk: **Banco de Dados:** Uma parte essencial deste projeto é a definição do banco de dados, que armazenará informações cruciais sobre os recursos educacionais, incluindo detalhes sobre os livros, disponibilidade e histórico de empréstimos.

- :computer: **Interface de Usuário:** A interface será projetada de forma intuitiva, permitindo uma fácil navegação para todos os tipos de usuários.

## :rocket: Como Contribuir

- Para contribuir com este projeto, siga as diretrizes de contribuição no arquivo CONTRIBUTING.md.

- Se você encontrar problemas ou bugs, por favor, abra uma issue em nosso repositório.


### Tecnologias utilizada nesse projeto

<table>
  <tr>
    <td>
      <img src="https://d33wubrfki0l68.cloudfront.net/49c2be6f2607b5c12dd27f8ecc8521723447975d/f05c5/logo-small.cbbeba89.svg" height=20>
      <a href="https://nestjs.com/">nestjs</a>
    </td>
    <td>
      <img src="https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/Next.js-900x0.png" height=20>
      <a href="https://nextjs.org/">nextjs</a>
    </td>
    <td>
      <img src="https://knexjs.org/knex-logo.png" height=20>
      <a href="https://knexjs.org/">knexjs</a>
    </td>
    <td>
      <img src="https://1.bp.blogspot.com/-sqAjIvOtpXI/XYoCmqOyMwI/AAAAAAAAJig/CowR8wgEauEs-RXN2IPmLYkC7NHoHuA3gCLcBGAsYHQ/s1600/node-js-logo.png" height=20>
      <a href="https://nodejs.org/en">nodejs</a>
    </td>
    <td>
      <img src="https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg" height=20>
      <a href="https://www.postgresql.org/">postgresql</a>
    </td>
  </tr>
  <tr>
    <td>10.1</td>
    <td>13.5</td>
    <td>2.5</td>
    <td>lts</td>
    <td>15.4</td>
  </tr>
</table>
<a href="https://www.typescriptlang.org/">
  <img src="https://img.shields.io/badge/Typescript-grey?style=for-the-badge&logo=typescript">
</a>

## Configuração do ambiente

### 1. Instalação do NVM (Node Version Manager) e Node.js (Linux)

#### Atualizar o Sistema

Antes de começar, é uma boa prática atualizar os pacotes do sistema. Abra um terminal e execute os seguintes comandos:

```bash
sudo apt update
sudo apt upgrade
```

#### Instalando o NVM (Node Version Manager)

Nessa etapa podemos usar dois métodos para baixar e instalar o NVM, o `curl` e o `wget` eles ficaram disponíveis para que você possa escolher o seu método.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Após isso feche e reabra o terminal

#### Verifique a instalação do NVM

Verifique se o `nvm` foi instalado corretamente digitando:

```bash
nvm --version
```

Deve ser apresentado a versão atual do `nvm`.

#### Instalando o Node.js

Com o `nvm` instalado podemos agora fazer a instalação de diversas versões do `Node.js` por exemplo a versão mais atual, a LTS por meio do comando:

```bash
nvm install --lts
```

Após isso verifique a versão do `Node.js` através do comando:

```bash

node --version
```

Deve ser apresentado a versão LTS do `Node.js`.

### 2. Instalação do PostgreSQL (Sistema de Gerenciamento de Banco de Dados)

#### Instalando o PostgreSQL

Para instalar o `postgresql` no linux basta executar o seguinte comando:

```bash
sudo apt install postgresql postgresql-contrib libpq-dev
```

#### Verifique a instalação do PostgreSQL

Verifique se o `postgresql` foi instalado corretamente digitando:

```bash
pg_config --version
```

Deve ser apresentado a versão atual do `postegresql`.

#### Configurando o PostgreSQL

Vamos entrar no console interativo do `postgresql` para criar um usuário privilegiado. Entre no terminal como o usuário do `postgres`:

```bash
sudo -i -u postgres
```

Inicie o terminal do PostgreSQL:

```bash
psql
```

Crie um usuário e garanta que tenha privilégios elevados:

```bash
CREATE USER 'nome' WITH PASSWORD 'senha';
ALTER USER 'nome' WITH SUPERUSER;
```

Altere os campos `nome` e `senha` para valores que desejar.

Para verificar que o usuário foi criado digite o comando

```bash
\du.
```

Para sair do terminal do `PostgreSQL` digite o comando

```bash
\q
```

### 2.1 Guia de Uso do Docker com PostgreSQL

#### Pré-requisitos
- [Docker](https://www.docker.com/get-started/) instalado em seu sistema.
- [Docker Compose](https://docs.docker.com/compose/install/) (geralmente incluído com a instalação do Docker).

#### Configuração do Docker Compose

No diretório do projeto, verifique se existe um arquivo docker-compose.yml. Este arquivo contém as configurações necessárias para criar o contêiner PostgreSQL.

#### Iniciar o Banco de Dados PostgreSQL

Abra um terminal e navegue até o diretório do projeto onde está o arquivo docker-compose.yml.
- *Para iniciar o contêiner PostgreSQL, execute o seguinte comando:*

```bash
docker-compose up -d
```
Isso criará e iniciará o contêiner PostgreSQL em segundo plano (-d).
Aguarde até que o contêiner esteja em execução. 
- *Você pode verificar o status do contêiner com o seguinte comando:*

```bash
docker ps
```
Certifique-se de que o contêiner PostgreSQL esteja listado na saída.

#### Conectar-se ao Banco de Dados PostgreSQL
Para se conectar ao banco de dados PostgreSQL a partir do terminal, use o seguinte comando:

```bash
psql -h localhost -U postgres -d db
```
- `-h` localhost: Especifica o host onde o PostgreSQL está sendo executado (local).
- `-U` postgres: Especifica o nome de usuário (geralmente é "postgres" por padrão).
- `-d` db: Especifica o nome do banco de dados ao qual você deseja se conectar.
- Será solicitada a senha do usuário "postgres". Insira a senha configurada no arquivo docker-compose.yml (por padrão, é "postgres").

Você estará conectado ao banco de dados PostgreSQL e poderá executar comandos SQL.

#### Encerrar o Contêiner
Quando você terminar de trabalhar com o banco de dados, você pode parar e remover o contêiner PostgreSQL usando o seguinte comando:

```bash
docker-compose down
```

Isso desligará e removerá o contêiner PostgreSQL. Certifique-se de que nenhum dado importante seja perdido antes de executar este comando.

## Frontend

### Iniciando o nextjs

antes de tudo é preciso ter o node instalado na máquina como é mostrado acima.

### Rodando o projeto

para rodar o frontend do projeto basta instalar as dependências e rodar o servidor utilizando esses comandos:

```bash
npm i
npm run dev
```

basta isso, se estiver tudo certo.

## Backend

## Instale as dependências

```bash
$ npm install
```

## Rodando a aplicação

```bash
# development
$ npm run start
```

