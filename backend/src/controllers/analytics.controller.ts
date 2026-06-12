import type { Request, Response } from "express";
import { storage } from "../repositories/storage.repository";

export async function getJobStats(req: Request, res: Response) {
  try {
    const stats = await storage.getJobStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching job stats:", error);
    res.status(500).json({ error: "Failed to fetch job stats" });
  }
}

export async function getTrends(req: Request, res: Response) {
  try {
    const jobs = await storage.getJobs();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const trends = last7Days.map(date => {
      const dayJobs = jobs.filter(job =>
        job.submissionTime.toISOString().split('T')[0] === date
      );
      return {
        date,
        count: dayJobs.length,
        label: new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
      };
    });

    res.json(trends);
  } catch (error) {
    console.error("Error fetching trends:", error);
    res.status(500).json({ error: "Failed to fetch trends" });
  }
}
