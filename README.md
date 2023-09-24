# Trabalho de Banco de Dados

## Configuração de ambiente

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
