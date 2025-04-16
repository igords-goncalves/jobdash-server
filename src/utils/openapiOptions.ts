import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const openapiOptions = {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "API Jobdash",
      description: "API web para aplicação Jobdash gerenciador de vagas",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http" as const,
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  transform: jsonSchemaTransform,
};
