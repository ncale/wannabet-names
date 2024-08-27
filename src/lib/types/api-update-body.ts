import { z } from "zod";
import { subnameSchema } from "./subname";
import { addressSchema } from "./address";
import { hexSchema } from "./hex";
import { avatarSchema, descriptionSchema } from "./update-form";

export const apiUpdateBodySchema = z.object({
  name: subnameSchema,
  address: addressSchema,
  avatar: avatarSchema.optional(),
  description: descriptionSchema.optional(),
  message: z.string(),
  signature: hexSchema,
});

export type ApiUpdateBodyType = z.infer<typeof apiUpdateBodySchema>;
