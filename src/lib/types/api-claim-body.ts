import { z } from "zod";
import { subnameSchema } from "./subname";
import { addressSchema } from "./address";
import { hexSchema } from "./hex";

export const apiClaimBodySchema = z.object({
  name: subnameSchema,
  address: addressSchema,
  message: z.string(),
  signature: hexSchema,
});

export type ApiClaimBodyType = z.infer<typeof apiClaimBodySchema>;
