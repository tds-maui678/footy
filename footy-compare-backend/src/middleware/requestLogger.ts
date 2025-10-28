import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import logger from "../lib/logger";

export default function requestLogger(req: Request, res: Response, next: NextFunction) {
  const reqId = (req.headers["x-request-id"] as string) || uuid();
  (req as any).id = reqId;
  const start = Date.now();

  res.setHeader("x-request-id", reqId);

  res.on("finish", () => {
    const ms = Date.now() - start;
    logger.info({ id: reqId, method: req.method, url: req.originalUrl, status: res.statusCode, ms }, "request");
  });
  next();
}