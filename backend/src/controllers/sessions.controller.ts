import type { Request, Response } from "express";
import { storage } from "../repositories/storage.repository";
import { insertSessionSchema } from "@shared/schema";
import { z } from "zod";

export async function getSessions(req: Request, res: Response) {
  try {
    const sessions = await storage.getSessions();
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
}

export async function createSession(req: Request, res: Response) {
  try {
    const sessionData = insertSessionSchema.parse(req.body);
    const session = await storage.createSession(sessionData);
    res.status(201).json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
}
