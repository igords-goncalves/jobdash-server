import { FastifyRequest, FastifyReply } from "fastify";
import { Application } from "../models";
import ApplicationService from "../services/Application.service";
import { QueryParams } from "../types/QueryParams";

export default class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const filter = request.query as QueryParams;
    const applications = await this.service.findAll(filter);

    return reply.code(200).send(applications);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const response = await this.service.findById(id);

    if (response?.length === 0) {
      return reply.status(404).send({ error: "Application not found" });
    }
    const application = response![0] as Application;
    return reply.code(200).send(application);
  }
}
