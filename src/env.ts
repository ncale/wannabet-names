import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NAMESTONE_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_ALCHEMY_URL: z.string().url(),
    NEXT_PUBLIC_WC_APP_ID: z.string().optional(),
    NEXT_PUBLIC_ENABLE_TESTNETS: z.coerce.boolean(),
  },
  runtimeEnv: {
    NAMESTONE_API_KEY: process.env.NAMESTONE_API_KEY,
    NEXT_PUBLIC_ALCHEMY_URL: process.env.NEXT_PUBLIC_ALCHEMY_URL,
    NEXT_PUBLIC_WC_APP_ID: process.env.NEXT_PUBLIC_WC_APP_ID,
    NEXT_PUBLIC_ENABLE_TESTNETS: process.env.NEXT_PUBLIC_ENABLE_TESTNETS,
  },
});
