import { Hex, isHex } from "viem";
import { z } from "zod";

export const hexSchema = z
  .string()
  .trim()
  .refine((val) => isHex(val), {
    message: "Invalid hex value",
  })
  .transform((val) => val as Hex);
