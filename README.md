# cadastroIdoso

O projeto é uma aplicação web completa com front, back e banco de dados, para cadastro de idosos e remédios que podem ser associados ao idoso. Foi criado para a cadeira de Banco de Dados da Faculdade.

## Tecnologias utilizadas:

- Para a parte de frontend, o projeto usa `HTML5`, `CSS3` e `JavaScript`;
- Para o backend foi feito uma API Rest em `Python` ultilizado as bibliotecas `Flask`, `flask-cors` e `mysql-connector-python`;
- O projeto usa o banco de dados MySQL.

## Como executar o projeto?

- Banco de dados:

  1. Execute o arquivo `query.sql` no seu MySQL;
  2. Caso queria inserir dados de exemplo, execute o aquivo `insert-exemple.sql` no seu MySQL.
- Backend:

  1. Abra um terminal na pasta `back`
  2. Instale as depedências necessárias no projeto executando o comando:
    ```bash
    pip install -r requirements.txt
    ```
  3. Inicialize o backend rodando o comando:
    ```bash
    python app.py
    ```
- Frontend:

  1. Instale um servidor http;
  2. Mova os arquivos da pasta `front` para o servidor;
  3. Execute o servidor http;

## Configurações do projeto:

- Considera-se que o projeto esteja sendo executado em `localhost`.
- Banco de dados:

  - Considera-se que o servidor MySQL esteja rodando na porta padrão, `3306`.
- Backend:

  - O arquivo `envoriments.json` contém todas as informações que o back ultiliza para acessar o banco de dados;
  - A porta ultilizada é `3000`.
- Frontend:

  - A porta vai depender do servidor, geralmente se utiliza a `80` ou a `443`, mas extensões do VS code como o `live server` faz utilização da porta `5500`.
