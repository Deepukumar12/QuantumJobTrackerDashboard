import type { Request, Response } from "express";
import { storage } from "../repositories/storage.repository";
import { openaiService } from "../services/openai.service";

export async function getJobSuggestions(req: Request, res: Response) {
  try {
    const { qubits, shots, backend, program } = req.body;
    const suggestions = await openaiService.generateJobSuggestions({
      qubits: parseInt(qubits),
      shots: parseInt(shots),
      backend,
      program
    });
    res.json(suggestions);
  } catch (error) {
    console.error("Error generating job suggestions:", error);
    res.status(500).json({ error: "Failed to generate AI suggestions" });
  }
}

export async function analyzeFailure(req: Request, res: Response) {
  try {
    const job = await storage.getJobById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    
    if (job.status !== 'failed') {
      return res.status(400).json({ error: "Job has not failed" });
    }

    const analysis = await openaiService.analyzeFailedJob(job);
    res.json(analysis);
  } catch (error) {
    console.error("Error analyzing failed job:", error);
    res.status(500).json({ error: "Failed to analyze failed job" });
  }
}

export async function getCircuitInstructions(req: Request, res: Response) {
  try {
    const job = await storage.getJobById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const instructions = await openaiService.getCircuitInstructions(job);
    res.json({ instructions });
  } catch (error) {
    console.error("Error getting circuit instructions:", error);
    res.status(500).json({ error: "Failed to get circuit instructions" });
  }
}

export async function getGuidedImprovements(req: Request, res: Response) {
  try {
    const job = await storage.getJobById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const improvements = await openaiService.getGuidedImprovements(job);
    res.json(improvements);
  } catch (error) {
    console.error("Error getting guided improvements:", error);
    res.status(500).json({ error: "Failed to get guided improvements" });
  }
}

export async function generateCircuitCode(req: Request, res: Response) {
  try {
    const { description, qubits } = req.body;
    const circuitCode = await openaiService.generateCircuitCode(description, parseInt(qubits));
    res.json({ circuitCode });
  } catch (error) {
    console.error("Error generating circuit code:", error);
    res.status(500).json({ error: "Failed to generate circuit code" });
  }
}

export async function chat(req: Request, res: Response) {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    
    const response = await openaiService.chat(message);
    res.json({ response });
  } catch (error) {
    console.error("Error during AI chat:", error);
    res.status(500).json({ error: "Failed to process AI chat" });
  }
}

export async function getAiStatus(req: Request, res: Response) {
  try {
    const configured = openaiService.isServiceConfigured();
    res.json({ configured });
  } catch (error) {
    console.error("Error getting AI status:", error);
    res.status(500).json({ error: "Failed to get AI status" });
  }
}
