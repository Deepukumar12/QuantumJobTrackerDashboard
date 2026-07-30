import express from "express";
import { requestLogger } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { registerRoutes } from "./routes/index";
import { setupVite, serveStatic } from "./config/vite";
import { appConfig } from "./config/app.config";

export async function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Request logging middleware
  app.use(requestLogger);

  // Register all routes and create HTTP server
  const server = await registerRoutes(app);

  // Global error handler middleware (must be registered after routes)
  app.use(errorHandler);

  // Configure Vite dev server in development, serve static in production
  if (appConfig.nodeEnv === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  return { app, server };
}
