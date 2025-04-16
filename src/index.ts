import { fastify, FastifyReply, FastifyRequest } from "fastify";
import db from "@fastify/postgres";
import { fastifyCors } from "@fastify/cors";
import { applicationRoutes } from "./routes/application.routes";

const app = fastify();

app.register(db, {
  connectionString: process.env.DATABASE_URL,
});
app.register(fastifyCors, {
  origin: "*",
});

app.get("/ping", (request: FastifyRequest, reply: FastifyReply) => {
  reply.send("pong!");
});

app.register(applicationRoutes, { prefix: "/api"})


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
