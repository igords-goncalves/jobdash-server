import { z } from "zod";

// FIXME: Fix error schema

const jobSchema = {
  id: z.string().uuid(),
  user_id: z.number(),
  company_name: z.string(),
  platform_name: z.string(),
  link: z.string().url(),
  skills: z.array(z.any()),
  tags: z.array(z.any()),
  current_status: z.string(),
  applied_at: z.string().datetime(),
  returned_at: z.string().datetime().nullable(),
  position: z.string(),
};

const tag = ["Applications"]

export const findAllSchema = {
  tags: tag,
  summary: "Get all applications",
  description: "Get all applications",
  querystring: z.object({
    current_status: z.string().optional(),
    company_name: z.string().optional(),
    position: z.string().optional(),
  }),
  response: {
    200: z.array(z.object(jobSchema)),
    404: z.object({
      error: z.string()
    })
  },
};

export const findByIdSchema = {
  tags: tag,
  summary: "Get application by id",
  description: "Get applications by id",
  params: z.object({
    id: z.union([z.string(), z.number()]),
  }),
  response: {
    200: z.object(jobSchema),
    404: z.object({
      error: z.string()
    })
  },
};
