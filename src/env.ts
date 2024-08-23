import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NAMESTONE_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_ALCHEMY_URL: z.string().url(),
    NEXT_PUBLIC_WC_APP_ID: z.string(),
    NEXT_PUBLIC_ENABLE_TESTNETS: z.coerce.boolean(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
  },
  runtimeEnv: {
    NAMESTONE_API_KEY: process.env.NAMESTONE_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_ALCHEMY_URL: process.env.NEXT_PUBLIC_ALCHEMY_URL,
    NEXT_PUBLIC_WC_APP_ID: process.env.NEXT_PUBLIC_WC_APP_ID,
    NEXT_PUBLIC_ENABLE_TESTNETS: process.env.NEXT_PUBLIC_ENABLE_TESTNETS,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  },
});
