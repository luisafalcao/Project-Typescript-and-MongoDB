# Procedimento para iniciar

Para visualizar melhor este arquivo aperte ctrl + shit + v

## Dependências para este projeto

As seguintes versões foram utilizadas neste projeto:

- node@22.4.0
- npm@10.8.1

## Instalação inicial do projeto

1. Inicialize o projeto de node.js executando o comando abaixo no terminal:

```bash
npm init # inicia o projeto de node
```

2. Responda os itens da forma que desejar. Ps. Você poderá alterá-lo depois.

Na opção "entry point:", recomendo colocar o "src/index.ts".

Será criado uma arquivo package.json na raiz do seu diretório. Exemplo do resultado:
```json
{
  "name": "tsbackend",
  "version": "0.0.1",
  "description": "Código das aulas de typescript back do instituto Infnet",
  "main": "src/index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Renan Torres",
  "license": "ISC"
}
```

4. Instale as dependências necessárias ao typescript executando o comando abaixo no terminal:

```bash
npm i typescript @types/node ts-node --save-dev 
# instala deps do ts como deps de dev
```

5. Crie uma pasta "src" para separar o código da aplicação das configurações externar:

```bash
mkdir src  # cria o diretorio fonte
```

6. Inicie o typescript com o comando abaixo:

```bash
npx tsc --init # inicializa o typescript
```

Agora você terá um arquivo tsconfig.json na pasta raíz do seu projeto

7. Para utilizar o hot reload instale o ts-node-dev

```bash
npm install --save-dev ts-node-dev
```

```json
"scripts": {
  "dev": "ts-node-dev src/main.ts"
}
```


## Configurações

### No arquivo tsconfig.json (se encontra na raíz do projeto)

1. Descomente a linha '"rootDir": "./",' (remova os '//' antes da linha) ;

2. Altere o  '"rootDir": "./",' para  '"rootDir": "./src",'.

3. Descomente  "outDir": "./", e altere para   "outDir": "./dist",

Resultado final:

```json
{
  "compilerOptions": {
    "target": "es2020", 
    "module": "commonjs",   
    "rootDir": "./src",
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true 
  }
} 
```

### No arquivo package.json

1. Dentro das chaves de scripts adicionar a linha start:

```ts
  "scripts": {
    "start": "ts-node src/index.ts",
    // demais scripts que desejar...
    "build": "npx tsc"
  },
```

### Debugger

1. Rode o script de build para criar os arquivos de produção (o debugger precisa dele para rodar):

```bash
npm run build
```

ou:

```bash
npx tsc
```

2. Na pasta raíz, criar arquivo ".vscode/launch.json"

3. Copie e cole a configuração abaixo dentro do arquivo:

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug TS",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/src/index.ts",
            "runtimeArgs": ["-r", "ts-node/register"],
            "preLaunchTask": "tsc: build - tsconfig.json",
            "outFiles": [
                "${workspaceFolder}/dist/**/*.js"
            ]
        },
    ]
}
```

4. Variável de ambiente

```bash
node --env-file=.env index.js
```
```env
NODE_OPTIONS='--title="Testing Node v20.6.0"'
USER_NAME='Renan Torres'
```

5. Opcional Lint

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx eslint --init
```

Criar arquivo de configuração .eslintrc.json: 

```json
{
    "parser": "@typescript-eslint/parser",
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "rules": {
      "@typescript-eslint/semi": ["error", "always"], // Adiciona ponto e vírgula
      "semi": ["error", "always"], 
        // Suas regras personalizadas aqui
    }
}

```

Adiciona um script para o lint:
```json
{
    "scripts": {
        //... demais scripts...
        "lint": "eslint ./src/**/*.ts --fix"
    }
}
```

### Configurar os testes (jest)

1. Instale as dependências do Jest como dev

```bash
npm install --save-dev jest ts-jest @types/jest
```

2. Crie um arquivo jest.config.ts e insira a seguinte configuração:

```ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
};
```

3. Descomente  "types": [], altere para   "types": ["node","jest"] e adicine as linhas abaixo fora das chaves do "compilersOptions":

"include": ["src/**/*.ts", "src/**/*.js"],
"exclude": ["node_modules", "**/*.test.ts"]


Resultado final:

```json
{
  "compilerOptions": {
    "target": "es2020", 
    "module": "commonjs",   
    "rootDir": "./src",
    "types": ["node","jest"], 
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true 
  },
  "include": ["src/**/*.ts", "src/**/*.js"],
  "exclude": ["node_modules", "**/*.test.ts"]
} 
```

4. Crie/ou altere o script para test no package.json para rodar o jest:


```json
{
    "scripts": {
        //... demais scripts...
        "lint": "eslint ./src/**/*.ts --fix",
        "test": "jest"
    }
}
```

5. (Opcional para quem usa o eslint) Inclua o jest na configuração do .eslint.json:
Comando a adicionar:
"include": ["src/**/*.ts", "src/**/*.test.ts", "src/**/__tests__/**/*.ts"],

```json
{
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard"
    ],
    "include": ["src/**/*.ts", "src/**/*.test.ts", "src/**/__tests__/**/*.ts"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 15,
        "sourceType": "module",
        "project": [
            "./tsconfig.json"
        ]
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/semi": "off",
        "semi": [2,"always"]
        
    }
}
```

