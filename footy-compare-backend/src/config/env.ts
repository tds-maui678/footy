import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(9000),
  CORS_ORIGIN: z.string().default("*"),

  API_FOOTBALL_KEY: z.string().min(1, "API_FOOTBALL_KEY is required"),

  DATABASE_URL: z.string().default("postgres://localhost:5432/footy"), // if you use Prisma later
  REDIS_URL: z.string().optional().or(z.literal("")),
  SUPABASE_URL: z.string().optional(),
  SUPABASE_SERVICE_KEY: z.string().optional()
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid environment:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;