import type { Express } from "express";
import { createServer, type Server } from "http";
import { apiRouter } from "./api.routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register unified API router
  app.use("/api", apiRouter);

  // Create Node HTTP Server wrapping Express app
  const httpServer = createServer(app);
  return httpServer;
}
