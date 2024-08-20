import { z } from "zod";
import { subnameSchema } from "./subname";

export const subnameFormSchema = z.object({
  name: subnameSchema,
});

export type SubnameFormType = z.infer<typeof subnameFormSchema>;
