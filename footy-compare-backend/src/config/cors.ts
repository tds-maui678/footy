import cors from "cors";
import { env } from "./env";

const allow = new Set(
  env.CORS_ORIGIN.split(",").map(s => s.trim()).filter(Boolean) // e.g. "http://localhost:5173,https://myapp.com"
);

export const corsMiddleware = cors({
  origin: (origin, cb) => {
    if (!origin || allow.has("*") || allow.has(origin)) return cb(null, true);
    cb(new Error(`CORS blocked for ${origin}`));
  },
  credentials: true
});