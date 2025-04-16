import { FastifyReply, FastifyRequest } from "fastify";
import { Application } from "../models";
import { findAllSchema, findByIdSchema } from "./schemas/application.schemas";
import { FastifyTypedInstance } from "../types/FastifyTypedInstance ";
import ApplicationService from "../services/Application.service";
import ApplicationRepository from "../repositories/Application.repository";
import ApplicationController from "../controllers/Application.controller";
import { v4 as uuidv4 } from "uuid";

export async function applicationRoutes(app: FastifyTypedInstance) {
  const uuid = uuidv4();

  const repository = new ApplicationRepository(app);
  const service = new ApplicationService(repository);
  const controller = new ApplicationController(service);

  app.get(
    "/applications",
    {
      schema: findAllSchema,
    },
    (request, reply) => controller.findAll(request, reply)
  );

  app.get(
    "/applications/:id",
    {
      schema: findByIdSchema,
    },
    (request, reply) => controller.findById(request, reply)
  );

  // TODO: Refatorar esses endpoints para usar o controller

  app.post(
    "/applications",
    {},
    async (request: FastifyRequest, reply: FastifyReply) => {
      const data = request.body as Application;

      const newApplication = {
        ...data,
        id: uuid,
        applied_at: new Date(),
        returned_at: null,
      };

      const query = `INSERT INTO applications 
      (id, user_id, company_name, platform_name, link, skills, tags, current_status, applied_at, returned_at, position) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
      const values = [
        newApplication.id,
        newApplication.user_id,
        newApplication.company_name,
        newApplication.platform_name,
        newApplication.link,
        newApplication.skills,
        newApplication.tags,
        newApplication.current_status,
        newApplication.applied_at,
        newApplication.returned_at,
        newApplication.position,
      ];

      const response = await app.pg.query(query, values);

      if (response.rowCount === 0) {
        return reply.status(500).send({
          error: "Failed to create application",
          details: "Database operation completed but no rows were affected",
        });
      }

      return reply.status(201).send({
        message: "Application created successfully",
      });
    }
  );

  app.put(
    "/applications/:id",
    {},
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };
      const data = request.body as Application;

      console.log(data);

      const query = `UPDATE applications SET 
      company_name = $1, 
      platform_name = $2, 
      link = $3, 
      skills = $4, 
      tags = $5, 
      current_status = $6, 
      position = $7
      WHERE id = $8`;

      const values = Object.values(data).concat(id);

      const response = await app.pg.query(query, values);
      if (response.rowCount === 0) {
        return reply.status(404).send({ error: "Application not found" });
      }

      return reply.send({ message: "Application updated successfully" });
    }
  );

  app.delete(
    "/applications/:id",
    {},
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

      const query = `DELETE FROM applications WHERE id = $1`;
      const values = [id];

      const response = await app.pg.query(query, values);
      if (response.rowCount === 0) {
        return reply.status(404).send({ error: "Application not found" });
      }

      return reply.send({ message: "Application deleted successfully" });
    }
  );
}
