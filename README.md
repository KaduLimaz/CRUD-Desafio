# CRUD Desafio

Este é um projeto de CRUD (Create, Read, Update, Delete) desenvolvido como parte de um desafio.

## Descrição

O CRUD Desafio é uma aplicação simples que demonstra operações básicas de um sistema CRUD utilizando Node.js, Express e MongoDB. Ele é composto por um projeto de Back-end e um projeto de Front-end.

## Funcionalidades

- **Create**: Adicionar novos registros ao banco de dados.
- **Read**: Ler e visualizar registros existentes no banco de dados.
- **Update**: Atualizar registros existentes no banco de dados.
- **Delete**: Excluir registros existentes do banco de dados.

## Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados antes de executar a aplicação:

- Node.js ou Docker instalado em sua máquina.

## Instalação

    1. Clone este repositório:

#### Back-end

1. Clone este repositório:

- git clone https://github.com/KaduLimaz/CRUD-Desafio.git

2. Navegue até o diretório do Back-end:

cd CRUD-Desafio/backend

3. Instale as dependências:
   npm install

##### Front-end

1. Instale as dependências:
   npm install

## Uso ✔

### Back-end

    1. Inicie o servidor
       - npm run dev

### Front-end

    1. Inicie o servidor
       - npm run dev

# Como executar utilizando o Docker

### Back-end

1 - Navegue até o diretório do Back-end:

    cd CRUD-Desafio/backend

2 - Execute o seguinte comando para iniciar o projeto com Docker Compose:

    docker-compose up

Isso irá construir e iniciar os contêineres necessários para executar o Back-end.

### Front-end

    1 - Navegue até o diretório do Front-end:

        cd CRUD-Desafio/frontend

    2 - Execute o seguinte comando para iniciar o projeto com Docker Compose:

        docker-compose up

Isso irá construir e iniciar os contêineres necessários para executar o Front-end.

### Como acessar

    Após a inicialização bem-sucedida, você pode acessar a aplicação em seu navegador usando o seguinte URL:
        http://localhost:porta

    Certifique-se de substituir <porta> pela porta específica em que a aplicação está sendo executada, conforme configurado docker-compose.yml.
