import { IApplicationRepository } from "../interfaces/IApplication.repository";
import { Application } from "../models";

export default class ApplicationService {
  constructor(private readonly repository: IApplicationRepository) {}

  parseStatusFilter(statusString: string) {
    if (!statusString) return [];
    return statusString.split(",").map((status) => status.trim());
  }

  buildQueryFilters(filter?: Partial<Application>) {
    let sql = "SELECT * FROM applications WHERE 1=1";
    const queryParams = [];
    let paramCount = 1;

    if (filter?.current_status) {
      const statuses = this.parseStatusFilter(filter.current_status);
      sql += ` AND current_status = ANY($${paramCount})`;
      queryParams.push(statuses);
      paramCount++;
    }
    return { sql, queryParams };
  }

  async findAll(filter?: Partial<Application>) {
    const { sql, queryParams } = this.buildQueryFilters(filter);
    return this.repository.findAll(sql, queryParams);
  }

  async findById(id: string) {
    const query = `SELECT * FROM applications WHERE id = $1`;
    return this.repository.findById(query, id);
  }

 
}
