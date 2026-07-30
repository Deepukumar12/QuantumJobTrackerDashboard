import type { Request, Response } from "express";
import { storage } from "../repositories/storage.repository";

export async function getBackends(req: Request, res: Response) {
  try {
    const backends = await storage.getBackends();
    res.json(backends);
  } catch (error) {
    console.error("Error fetching backends:", error);
    res.status(500).json({ error: "Failed to fetch backends" });
  }
}
