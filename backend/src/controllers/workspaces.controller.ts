import type { Request, Response } from "express";
import { storage } from "../repositories/storage.repository";
import { insertWorkspaceSchema, insertWorkspaceMemberSchema } from "@shared/schema";
import { z } from "zod";

export async function getWorkspaces(req: Request, res: Response) {
  try {
    const workspaces = await storage.getWorkspaces();
    res.json(workspaces);
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    res.status(500).json({ error: "Failed to fetch workspaces" });
  }
}

export async function searchWorkspaces(req: Request, res: Response) {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const workspaces = await storage.searchWorkspaces(query);
    res.json(workspaces);
  } catch (error) {
    console.error("Error searching workspaces:", error);
    res.status(500).json({ error: "Search failed" });
  }
}

export async function getWorkspaceById(req: Request, res: Response) {
  try {
    const workspace = await storage.getWorkspaceById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ error: "Workspace not found" });
    }
    res.json(workspace);
  } catch (error) {
    console.error(`Error fetching workspace with ID ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to fetch workspace" });
  }
}

export async function createWorkspace(req: Request, res: Response) {
  try {
    const workspaceData = insertWorkspaceSchema.parse(req.body);
    const workspace = await storage.createWorkspace(workspaceData);
    res.status(201).json(workspace);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating workspace:", error);
    res.status(500).json({ error: "Failed to create workspace" });
  }
}

export async function updateWorkspace(req: Request, res: Response) {
  try {
    const workspace = await storage.updateWorkspace(req.params.id, req.body);
    if (!workspace) {
      return res.status(404).json({ error: "Workspace not found" });
    }
    res.json(workspace);
  } catch (error) {
    console.error(`Error updating workspace ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to update workspace" });
  }
}

export async function deleteWorkspace(req: Request, res: Response) {
  try {
    const success = await storage.deleteWorkspace(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Workspace not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(`Error deleting workspace ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to delete workspace" });
  }
}

export async function getWorkspaceMembers(req: Request, res: Response) {
  try {
    const members = await storage.getWorkspaceMembers(req.params.workspaceId);
    res.json(members);
  } catch (error) {
    console.error("Error fetching workspace members:", error);
    res.status(500).json({ error: "Failed to fetch workspace members" });
  }
}

export async function addWorkspaceMember(req: Request, res: Response) {
  try {
    const memberData = insertWorkspaceMemberSchema.parse({
      ...req.body,
      workspaceId: req.params.workspaceId
    });
    const member = await storage.addWorkspaceMember(memberData);
    res.status(201).json(member);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error adding workspace member:", error);
    res.status(500).json({ error: "Failed to add workspace member" });
  }
}

export async function updateWorkspaceMember(req: Request, res: Response) {
  try {
    const member = await storage.updateWorkspaceMember(req.params.id, req.body);
    if (!member) {
      return res.status(404).json({ error: "Workspace member not found" });
    }
    res.json(member);
  } catch (error) {
    console.error(`Error updating workspace member ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to update workspace member" });
  }
}

export async function removeWorkspaceMember(req: Request, res: Response) {
  try {
    const success = await storage.removeWorkspaceMember(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Workspace member not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(`Error removing workspace member ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to remove workspace member" });
  }
}
