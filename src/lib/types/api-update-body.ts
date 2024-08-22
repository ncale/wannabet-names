import { z } from "zod";
import { subnameSchema } from "./subname";
import { addressSchema } from "./address";
import { hexSchema } from "./hex";
import { avatarUrlSchema, bioSchema } from "./update-form";

export const apiUpdateBodySchema = z.object({
  name: subnameSchema,
  address: addressSchema,
  avatarUrl: avatarUrlSchema.optional(),
  bio: bioSchema.optional(),
  message: z.string(),
  signature: hexSchema,
});

export type ApiUpdateBodyType = z.infer<typeof apiUpdateBodySchema>;
