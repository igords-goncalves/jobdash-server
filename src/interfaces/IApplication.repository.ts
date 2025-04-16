import { Application } from "../models";

export interface IApplicationRepository {
  findAll(sql?: string, queryParams?: any[]): Promise<Application[]>;
  findById(query: string, id: string): Promise<any[] | null>;
  create?(application: Application): Promise<void>;
  update?(id: string, application: Partial<Application>): Promise<void>;
  delete?(id: string): Promise<void>;
}