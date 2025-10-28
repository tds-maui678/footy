import pino from "pino";
const logger = pino({
  transport: { target: "pino-pretty", options: { translateTime: "SYS:standard" } },
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});
export default logger;
