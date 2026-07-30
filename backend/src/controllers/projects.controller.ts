import type { Request, Response } from "express";
import { storage } from "../repositories/storage.repository";
import { insertProjectSchema, insertProjectCollaboratorSchema } from "@shared/schema";
import { z } from "zod";

export async function getProjects(req: Request, res: Response) {
  try {
    const projects = await storage.getProjects();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}

export async function searchProjects(req: Request, res: Response) {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const projects = await storage.searchProjects(query);
    res.json(projects);
  } catch (error) {
    console.error("Error searching projects:", error);
    res.status(500).json({ error: "Search failed" });
  }
}

export async function getProjectsByWorkspace(req: Request, res: Response) {
  try {
    const projects = await storage.getProjectsByWorkspace(req.params.workspaceId);
    res.json(projects);
  } catch (error) {
    console.error("Error fetching workspace projects:", error);
    res.status(500).json({ error: "Failed to fetch workspace projects" });
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const project = await storage.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error(`Error fetching project with ID ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const projectData = insertProjectSchema.parse(req.body);
    const project = await storage.createProject(projectData);
    res.status(201).json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const project = await storage.updateProject(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error(`Error updating project ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to update project" });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const success = await storage.deleteProject(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(`Error deleting project ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to delete project" });
  }
}

export async function getProjectCollaborators(req: Request, res: Response) {
  try {
    const collaborators = await storage.getProjectCollaborators(req.params.projectId);
    res.json(collaborators);
  } catch (error) {
    console.error("Error fetching project collaborators:", error);
    res.status(500).json({ error: "Failed to fetch project collaborators" });
  }
}

export async function addProjectCollaborator(req: Request, res: Response) {
  try {
    const collaboratorData = insertProjectCollaboratorSchema.parse({
      ...req.body,
      projectId: req.params.projectId
    });
    const collaborator = await storage.addProjectCollaborator(collaboratorData);
    res.status(201).json(collaborator);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error adding project collaborator:", error);
    res.status(500).json({ error: "Failed to add project collaborator" });
  }
}

export async function updateProjectCollaborator(req: Request, res: Response) {
  try {
    const collaborator = await storage.updateProjectCollaborator(req.params.id, req.body);
    if (!collaborator) {
      return res.status(404).json({ error: "Project collaborator not found" });
    }
    res.json(collaborator);
  } catch (error) {
    console.error(`Error updating project collaborator ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to update project collaborator" });
  }
}

export async function removeProjectCollaborator(req: Request, res: Response) {
  try {
    const success = await storage.removeProjectCollaborator(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Project collaborator not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(`Error removing project collaborator ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to remove project collaborator" });
  }
}
