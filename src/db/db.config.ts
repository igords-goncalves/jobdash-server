import db from "@fastify/postgres";

export function dbConfig() {
  const connection = { connectionString: process.env.DATABASE_URL };

  return {
    db,
    connection,
  };
}
