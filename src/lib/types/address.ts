import { Address, isAddress } from "viem";
import { z } from "zod";

export const addressSchema = z
  .string()
  .trim()
  .refine((val) => isAddress(val), {
    message: "Invalid ethereum address",
  })
  .transform((val) => val as Address);
