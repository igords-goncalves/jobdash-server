import { Application } from "../models";

export type QueryParams = Omit<
  Application,
  | "id"
  | "user_id"
  | "applied_at"
  | "returned_at"
  | "skills"
  | "tags"
  | "applied_at"
  | "returned_at"
  | "link"
>;