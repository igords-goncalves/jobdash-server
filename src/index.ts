import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { applicationRoutes } from "./routes/application.routes";
import { dbConfig } from "./db/db.config";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { openapiOptions } from "./utils/openapiOptions";

const app = fastify().withTypeProvider<ZodTypeProvider>();

const { db, connection } = dbConfig();
app.register(db, connection);

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, openapiOptions);
app.register(fastifySwaggerUi, {
  routePrefix: "/api/docs",
});

app.register(applicationRoutes, { prefix: "/api" });

app.listen(
  { port: Number(process.env.PORT), host: "0.0.0.0" },
  (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  }
);
