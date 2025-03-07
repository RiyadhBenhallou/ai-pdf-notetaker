import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // NODE_ENV: z.enum(["development", "test", "production"]),
    CONVEX_DEPLOYMENT: z.string(),
  },
  client: {
    NEXT_PUBLIC_GEMINI_API_KEY: z.string(),
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
});
