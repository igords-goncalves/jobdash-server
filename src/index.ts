import { fastify, FastifyReply, FastifyRequest } from "fastify";
import db from "@fastify/postgres";

const app = fastify();

app.register(db, {
  connectionString: process.env.DATABASE_URL,
});

app.get("/ping", (request: FastifyRequest, reply: FastifyReply) => {
  reply.send("pong!");
});

app.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
  const response = await app.pg.query("SELECT * FROM users");
  return reply.send(response.rows);
});

app.get("/jobs", async (request: FastifyRequest, reply: FastifyReply) => {
  const response = await app.pg.query("SELECT * FROM applications");
  return reply.send(response.rows);
});

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
