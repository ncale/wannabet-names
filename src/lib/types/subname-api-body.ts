import { z } from "zod";
import { subnameSchema } from "./subname";
import { addressSchema } from "./address";
import { hexSchema } from "./hex";

export const apiBodySchema = z.object({
  name: subnameSchema,
  address: addressSchema,
  message: z.string(),
  signature: hexSchema,
});

export type ApiBodyType = z.infer<typeof apiBodySchema>;
