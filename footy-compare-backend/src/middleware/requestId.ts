import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";
export function requestId(_req: Request, res: Response, next: NextFunction) {
  res.locals.reqId = randomUUID();
  res.setHeader("X-Request-Id", res.locals.reqId);
  next();
}