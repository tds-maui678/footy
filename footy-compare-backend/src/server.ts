import { createServer } from "http";
import app from "./app";
import { env } from "./config/env";

const PORT = env.PORT || 9000;

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Optional graceful shutdown
process.on("SIGINT", () => {
  console.log("🛑 Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});