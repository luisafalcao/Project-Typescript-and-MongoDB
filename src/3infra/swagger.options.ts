import { SwaggerOptions } from "swagger-ui-express";
const swaggerConfig: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários do curso Back com Ts',
      version: '1.0.0',
      description: 'Documentação da API de Usuários',
    },
    tags: [
      {
        name: 'usuarios',
        description: 'Operações relacionadas aos usuários',
      },
    ],
    servers: [
        {
          url: '/api',
          description: 'URL base para a API',
        },
    ],
    components: {
        securitySchemes: {
            ApiKeyAuth:      
                {
                    type: "apiKey",
                    in: "header",    
                    name: "api-key"
                }
        }
    },
    security:
    [{ ApiKeyAuth: []} ]
   
  },
  apis: ['./src/**/*.ts'], // Caminho para seus arquivos TS
};

export default swaggerConfig;
