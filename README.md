# Projeto Backend com Typescript

## Endpoints:

### Usuários:

1. Buscar todos os usuários (GET)

    /usuarios

<br>

2. Buscar usuário por id (GET)

    /usuarios/:id

<br>

3. Criar usuário (POST)

    /usuarios

<br>

**Body da requisição:**

```json
{
    "nome": "Leonardo Dicaprio",
    "ativo": true,
    "contato": {
        "email": "leo@email.com",
        "telefone": "232.532.2342",
        "website": "www.website.com"
    }
}
```

_Apenas o nome é obrigatório._

<br>

4. Atualizar/editar usuário (PATCH)

    /usuarios/:\_id

<br>

5. Deletar usuário (DELETE)

    /usuarios/:id

<br>

### Filmes:

1. Buscar todos os filmes (GET)

    /filmes

<br>

2. Criar filme (POST)

    /filmes

<br>

**Body da requisição:**

```json
{
    "titulo": "Oppenheimer",
    "diretor": "Christopher Nolan",
    "ano": 2023
}
```

_Apenas o título é obrigatório._

<br>

3. Atualizar/editar filme (PATCH)
   /filmes/:\_id

<br>

4. Deletar filme (DELETE)
   /filmes/:id

<br>

5. Conectar usuários a filmes (PATCH)
   /filmes/adicionar-elenco

<br>

**Body da requisição:**

```json
{
    "userId": "66f9f2ade73feb45e59294f2",
    "movieData": {
        "titulo": "Titanic"
    }
}
```

_**userId** = \_id do usuário_

_**título** = título do filme_
