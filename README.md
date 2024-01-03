# APIFinanças
API desenvolvida para controle financeiro pessoal. RESTful API que permite:  
Cadastrar Usuário,
Fazer Login,
Detalhar Perfil do Usuário Logado,
Editar Perfil do Usuário Logado,
Listar categorias, 
Listar transações, 
Detalhar transação, 
Cadastrar transação,
Editar transação, 
Remover transação, 
Obter extrato de transações.


<h1 align="center">
  <br>
  <img width="200" src="src/assets/to_readme/Logo-APIFINANCAS.png">
  <br>
  APIFinanças
</h1>

# Escopo da API
### Criação de conta
  
`POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha

- **Resposta**  
  Em caso de **sucesso**, deveremos enviar no corpo (body) da resposta o conteúdo do usuário cadastrado, incluindo seu respectivo `id` e excluindo a senha criptografada.
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**
  - Validação dos campos obrigatórios:
    - nome
    - email
    - senha
  - Valida se o e-mail informado já existe
  - Senha é criptografada antes de persistir no banco de dados
  - Usuário  é cadastrado no banco de dados

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```


<p align="center" >
<img width="2000" src="src/assets/to_readme/criar-conta.png">
</p>

### Login do usuário
  
`POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - email
  - senha

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com a propriedade **token** que deverá possuir como valor o token de autenticação gerado e uma propriedade **usuario** que deverá possuir as informações do usuário autenticado, exceto a senha do usuário.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**

  - Validar os campos obrigatórios:
    - email
    - senha
  - Verificar se o e-mail existe
  - Validar e-mail e senha
  - Criar token de autenticação com id do usuário

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

---


<p align="center" >
<img width="2000" src="src/assets/to_readme/login.png">
</p>


### Detalhar Perfil do Usuário Logado
  
`GET` `/usuario`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o usuário encontrado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.  
  **Dica:** neste endpoint podemos fazer uso do status code 401 (Unauthorized).

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

<p align="center" >
<img width="2000" src="src/assets/to_readme/detalhar-usuario-logado.png">
</p>


### **Atualizar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha

- **Resposta**  
  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**
  - Validar os campos obrigatórios:
    - nome
    - email
    - senha
  - Validar se o novo e-mail já existe no banco de dados para outro usuário
    - Caso já exista o novo e-mail fornecido para outro usuário no banco de dados, a alteração não deve ser permitida (o campo de email deve ser sempre único no banco de dados)
  - Criptografar a senha antes de salvar no banco de dados
  - Atualizar as informações do usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```
<p align="center" >
<img width="2000" src="src/assets/to_readme/atualizar-conta.png">
</p>

### Listar categorias
  
`GET` `/categoria`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (categorias) encontrados.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**
  - O endpoint deverá responder com um array de todas as categorias cadastradas.

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
  {
    id: 1,
    descricao: "Roupas",
  },
  {
    id: 2,
    descricao: "Mercado",
  },
];
```

```javascript
// HTTP Status 200 / 201 / 204
[];
```

<p align="center" >
<img width="2000" src="src/assets/to_readme/listar-categorias.png">
</p>


### Obter extrato de transações
  
`GET` `/transacao/extrato`

Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas.
**Lembre-se:** Deverá ser possível consultar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
  Em caso de **sucesso**, deveremos enviar no corpo (body) da resposta um objeto contendo a soma de todas as transações do tipo `entrada` e a soma de todas as transações do tipo `saida`.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**:
  - Em caso de não existir transações do tipo `entrada` cadastradas para o usuário logado, o valor retornado no corpo (body) da resposta deverá ser 0.
  - Em caso de não existir transações do tipo `saida` cadastradas para o usuário logado, o valor retornado no corpo (body) da resposta deverá ser 0.

<p align="center" >
<img width="2000" src="src/assets/to_readme/exibir-extrato.png">
</p>


### Cadastrar transação para o usuário logado**
  
`POST` `/transacao`

Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.  
**Lembre-se:** Deverá ser possível cadastrar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**
  Em caso de **sucesso**, deveremos enviar, no corpo (body) da resposta, as informações da transação cadastrada, incluindo seu respectivo `id`.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**
  - Validar os campos obrigatórios:
    - descricao
    - valor
    - data
    - categoria_id
    - tipo
  - Validar se existe categoria para o id enviado no corpo (body) da requisição.
  - Validar se o tipo enviado no corpo (body) da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
  - Cadastrar a transação associada ao usuário logado.

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

<p align="center" >
<img width="2000" src="src/assets/to_readme/cadastrar-transacao.png">
</p>

### Listar transações
  
`GET` `/transacao`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas.  
**Lembre-se:** Deverão ser retornadas **apenas** transações associadas ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (transações) encontrados.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**
  - O usuário deverá ser identificado através do ID presente no token de validação
  - O endpoint deverá responder com um array de todas as transações associadas ao usuário. Caso não exista nenhuma transação associada ao usuário deverá responder com array vazio.

#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
  {
    id: 1,
    tipo: "saida",
    descricao: "Sapato amarelo",
    valor: 15800,
    data: "2022-03-23T15:35:00.000Z",
    usuario_id: 5,
    categoria_id: 4,
    categoria_nome: "Roupas",
  },
  {
    id: 3,
    tipo: "entrada",
    descricao: "Salário",
    valor: 300000,
    data: "2022-03-24T15:30:00.000Z",
    usuario_id: 5,
    categoria_id: 6,
    categoria_nome: "Salários",
  },
];
```

```javascript
// HTTP Status 200 / 201 / 204
[];
```

<p align="center" >
<img width="2000" src="src/assets/to_readme/listar-transacoes.png">
</p>

### Detalhar uma transação do usuário logado
  
`GET` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas.  
**Lembre-se:** Deverá ser retornado **apenas** transação associada ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
  Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
  O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa a transação encontrada, com todas as suas propriedades, conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.

#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação não encontrada."
}
```

<p align="center" >
<img width="2000" src="src/assets/to_readme/detalhar-transacao.png">
</p>

### Deletar transação
  
`/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.  
**Lembre-se:** Deverá ser possível excluir **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
  Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
  O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**:
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Excluir a transação no banco de dados.

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação não encontrada."
}
```

<p align="center" >
<img width="2000" src="src/assets/to_readme/deletar-transacoes.png">
</p>

### Atualizar transação
  
`PUT` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas.  
**Lembre-se:** Deverá ser possível atualizar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
  Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**  
  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Validar os campos obrigatórios:
    - descricao
    - valor
    - data
    - categoria_id
    - tipo
  - Validar se existe categoria para o id enviado no corpo (body) da requisição.
  - Validar se o tipo enviado no corpo (body) da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
  - Atualizar a transação no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /transacao/2
{
	"descricao": "Sapato amarelo",
	"valor": 15800,
	"data": "2022-03-23 12:35:00",
	"categoria_id": 4,
	"tipo": "saida"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

<p align="center" >
<img width="2000" src="src/assets/to_readme/atualizar-transacao.png">
</p>


## Como Usar

Para clonar e executar esta aplicação, você precisará do Git e do Node.js (que vem com o npm) instalados em seu computador. No seu terminal de comando:

```bash
# Clone o repositorio
$ git clone https://github.com/Joanna-Ribeiro/APIFinancas.git

# Go into the repository
$ cd APIFinancas

# Instale as dependências
$ npm install

# Inicie a aplicação
$ npm run start
```

> **Nota**
>Se você estiver usando o Linux Bash no Windows, [consulte este guia](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) ou utilize o comando `node` a partir do prompt de comando.

## Emailware

APIFinanças é um software de gestão de finanças pessoais . Ou seja, se você gostou de usar este aplicativo ou se ele o ajudou de alguma forma, gostaria que você me enviasse um e-mail para joannac581@gmail.com sobre qualquer coisa que gostaria de dizer sobre este software. Eu realmente aprecio isso!

## Créditos

Este software utiliza os seguintes pacotes de código aberto:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Cors](https://www.npmjs.com/package/cors)

---

## Contribuidores ✨

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><img src="src/assets/to_readme/joanna.jpeg" width="100px;" alt="Joanna Ribeiro"/><br /><sub><b>Joanna Ribeiro</b></sub></a><br /><a href="#question-CompuIves" title="Answering Questions">💬</a> <a href="#blog-CompuIves" title="Blogposts">📝</a> <a href="https://github.com/codesandbox/codesandbox-client/issues?q=author%3ACompuIves" title="Bug reports">🐛</a> <a href="https://github.com/codesandbox/codesandbox-client/commits?author=CompuIves" title="Code">💻</a></a> <a href="https://github.com/codesandbox/codesandbox-client/commits?author=CompuIves" title="Documentation">📖</a> <a href="#example-CompuIves" title="Examples">💡</a> <a href="#infra-CompuIves" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/codesandbox/codesandbox-client/pulls?q=is%3Apr+reviewed-by%3ACompuIves" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/codesandbox/codesandbox-client/commits?author=CompuIves" title="Tests">⚠️</a> <a href="#tool-CompuIves" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><img src="src/assets/to_readme/jessica.jpeg" width="100px;" alt="Jéssica Lira"/><br /><sub><b>Jéssica Lira</b></sub></a><br /><a href="https://github.com/codesandbox/codesandbox-client/commits?author=donavon" title="Code">💻</a></td>
    
  </tbody>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->


## Obrigada

<img src="src/assets/to_readme/cubos_academy_logo.jpeg" width="50"/>
Agradecemos à Cubos Academy por fornecer uma plataforma educacional de alta qualidade que tem sido fundamental para o desenvolvimento e aprimoramento das habilidades técnicas necessárias para este projeto. 
