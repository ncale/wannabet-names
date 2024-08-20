import { z } from "zod";

export const subnameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(18)
  .regex(/^[a-z0-9]+$/, "Only alphanumeric characters are allowed");

export const subnameFormSchema = z.object({
  name: subnameSchema,
});

export type SubnameFormType = z.infer<typeof subnameFormSchema>;
