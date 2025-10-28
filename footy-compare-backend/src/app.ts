import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import YAML from "yaml";

import { env } from "./config/env";
import requestLogger from "./middleware/requestLogger";
import errorHandler from "./middleware/error";
import notFound from "./middleware/notFound";
import routes from "./routes";
import pino from "pino";
import { requestId } from "./middleware/requestId";
const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 60_000, max: 100 }));
app.use(requestLogger);

app.get("/health", (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

const specPath = path.join(__dirname, "../openapi/spec.yaml");
const openapiDoc = YAML.parse(fs.readFileSync(specPath, "utf8"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDoc));
export const logger = pino({level: process.env.lOG_LEVEL ?? "info"});
app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

export default app;
