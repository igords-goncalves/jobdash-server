import { Application } from "../models";
import { FastifyTypedInstance } from "../types/FastifyTypedInstance ";

interface IApplicationRepository {}

export default class ApplicationRepository implements IApplicationRepository {
  constructor(private readonly db: FastifyTypedInstance) {}

  async findAll(sql: string, queryParams: any[]): Promise<Application[]> {
    const response = await this.db.pg.query(sql, queryParams);
    return response.rows as Application[];
  }

  async findById(query: string, id: string) {
    const response = await this.db.pg.query(query, [id]);
    return response.rows;
  }
}
