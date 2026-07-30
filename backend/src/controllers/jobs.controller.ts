import type { Request, Response } from "express";
import { storage } from "../repositories/storage.repository";
import { insertJobSchema } from "@shared/schema";
import type { JobStatus } from "@shared/schema";
import { z } from "zod";

export async function getJobs(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const allJobs = await storage.getJobs();
    const totalJobs = allJobs.length;
    const paginatedJobs = allJobs.slice(offset, offset + limit);

    res.json({
      jobs: paginatedJobs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
        totalJobs,
        limit
      }
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}

export async function searchJobs(req: Request, res: Response) {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const jobs = await storage.searchJobs(query);
    res.json(jobs);
  } catch (error) {
    console.error("Error searching jobs:", error);
    res.status(500).json({ error: "Search failed" });
  }
}

export async function getJobsByStatus(req: Request, res: Response) {
  try {
    const status = req.params.status as JobStatus;
    const jobs = await storage.getJobsByStatus(status);
    res.json(jobs);
  } catch (error) {
    console.error(`Error fetching jobs by status ${status}:`, error);
    res.status(500).json({ error: "Failed to fetch jobs by status" });
  }
}

export async function getJobById(req: Request, res: Response) {
  try {
    const job = await storage.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error(`Error fetching job with ID ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
}

export async function createJob(req: Request, res: Response) {
  try {
    const jobData = insertJobSchema.parse(req.body);
    const job = await storage.createJob(jobData);
    res.status(201).json(job);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
}

export async function updateJobStatus(req: Request, res: Response) {
  try {
    const { status, error } = req.body;
    const job = await storage.updateJobStatus(req.params.id, status, error);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error(`Error updating status for job ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to update job status" });
  }
}

export async function deleteJob(req: Request, res: Response) {
  try {
    const success = await storage.deleteJob(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(`Error deleting job ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to delete job" });
  }
}
