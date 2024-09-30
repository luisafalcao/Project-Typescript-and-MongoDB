# Projeto Backend com Typescript

## Endpoints:

### Usuários:

1. Buscar todos os usuários (GET)
   /usuarios

2. Buscar usuário por id (GET)
   /usuarios/:id

3. Criar usuário (POST)
   /usuarios

body:

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

Apenas o nome é obrigatório.

4. Atualizar/editar usuário (PATCH)
   /usuarios/:\_id

5. Deletar usuário (DELETE)
   /usuarios/:id

### Filmes:

1. Buscar todos os filmes (GET)
   /filmes

2. Criar filme (POST)
   /filmes

body:

```json
{
    "titulo": "Oppenheimer",
    "diretor": "Christopher Nolan",
    "ano": 2023
}
```

Apenas o título é obrigatório.

3. Atualizar/editar filme (PATCH)
   /filmes/:\_id

4. Deletar filme (DELETE)
   /filmes/:id

5. Conectar usuários a filmes (PATCH)
   /filmes/adicionar-elenco

body:

```json
body:
{
    "userId": "66f9f2ade73feb45e59294f2",
    "movieData": {
        "titulo": "Titanic"
    }
}

```

userId = \_id do usuário
título = título do filme
