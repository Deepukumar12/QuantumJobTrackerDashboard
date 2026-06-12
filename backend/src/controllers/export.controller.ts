import type { Request, Response } from "express";
import { storage } from "../repositories/storage.repository";

export async function exportCSV(req: Request, res: Response) {
  try {
    const jobs = await storage.getJobs();
    const csvHeaders = "Job ID,Backend,Status,Submitted,Duration\n";
    const csvData = jobs.map(job =>
      `${job.id},${job.backend},${job.status},${job.submissionTime.toISOString()},${job.duration || 0}`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="quantum_jobs.csv"');
    res.send(csvHeaders + csvData);
  } catch (error) {
    console.error("Error exporting jobs to CSV:", error);
    res.status(500).json({ error: "Failed to export CSV" });
  }
}

export async function exportJSON(req: Request, res: Response) {
  try {
    const jobs = await storage.getJobs();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="quantum_jobs.json"');
    res.json(jobs);
  } catch (error) {
    console.error("Error exporting jobs to JSON:", error);
    res.status(500).json({ error: "Failed to export JSON" });
  }
}
