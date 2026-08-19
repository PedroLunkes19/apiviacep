# API ViaCEP + Melhor Envio

Projeto para consulta de CEP e cálculo de frete utilizando ViaCEP e Melhor Envio.

## Como rodar

### 1. Instale as dependências

No terminal, dentro da pasta do projeto:

npm install


### 2. Configure o token

Defina o token do Melhor Envio:

export ME_TOKEN="SEU_TOKEN"


### 3. Inicie o servidor

node server.js


Se estiver funcionando, aparecerá:

Servidor rodando em http://localhost:3000


### 4. Abra o projeto

Abra o arquivo `index.html` no navegador.

### 5. Utilize

1. Informe o CEP do remetente.
2. Clique em **Buscar Remetente**.
3. Informe o CEP do destinatário.
4. Clique em **Buscar Destinatário**.
5. Informe o peso e as dimensões do pacote.
6. Clique em **Calcular Frete**.

O resultado da cotação será exibido na página.

## Tecnologias

* HTML
* CSS
* JavaScript
* Node.js
* Express
* ViaCEP
* Melhor Envio

