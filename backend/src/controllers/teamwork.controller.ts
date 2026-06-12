import type { Request, Response } from "express";
import { storage } from "../repositories/storage.repository";

// ================== TEAMWORK ENDPOINTS ==================

// Pricing Plans
export async function getPricingPlans(req: Request, res: Response) {
  try {
    const plans = await storage.getPricingPlans();
    res.json(plans);
  } catch (error) {
    console.error("Error fetching pricing plans:", error);
    res.status(500).json({ error: "Failed to fetch pricing plans" });
  }
}

export async function getPricingPlanById(req: Request, res: Response) {
  try {
    const plan = await storage.getPricingPlanById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Pricing plan not found" });
    res.json(plan);
  } catch (error) {
    console.error("Error fetching pricing plan:", error);
    res.status(500).json({ error: "Failed to fetch pricing plan" });
  }
}

export async function createPricingPlan(req: Request, res: Response) {
  try {
    const plan = await storage.createPricingPlan(req.body);
    res.json(plan);
  } catch (error) {
    console.error("Error creating pricing plan:", error);
    res.status(500).json({ error: "Failed to create pricing plan" });
  }
}

export async function updatePricingPlan(req: Request, res: Response) {
  try {
    const plan = await storage.updatePricingPlan(req.params.id, req.body);
    if (!plan) return res.status(404).json({ error: "Pricing plan not found" });
    res.json(plan);
  } catch (error) {
    console.error("Error updating pricing plan:", error);
    res.status(500).json({ error: "Failed to update pricing plan" });
  }
}

export async function deletePricingPlan(req: Request, res: Response) {
  try {
    const success = await storage.deletePricingPlan(req.params.id);
    if (!success) return res.status(404).json({ error: "Pricing plan not found" });
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting pricing plan:", error);
    res.status(500).json({ error: "Failed to delete pricing plan" });
  }
}

export async function publishPricingPlan(req: Request, res: Response) {
  try {
    const plan = await storage.publishPricingPlan(req.params.id);
    if (!plan) return res.status(404).json({ error: "Pricing plan not found" });
    res.json(plan);
  } catch (error) {
    console.error("Error publishing pricing plan:", error);
    res.status(500).json({ error: "Failed to publish pricing plan" });
  }
}

export async function getPricingPlanVersions(req: Request, res: Response) {
  try {
    const versions = await storage.getPricingPlanVersions(req.params.id);
    res.json(versions);
  } catch (error) {
    console.error("Error fetching plan versions:", error);
    res.status(500).json({ error: "Failed to fetch versions" });
  }
}

// Content sections
export async function getContentSections(req: Request, res: Response) {
  try {
    const sections = await storage.getContentSections();
    res.json(sections);
  } catch (error) {
    console.error("Error fetching content sections:", error);
    res.status(500).json({ error: "Failed to fetch content" });
  }
}

export async function getContentSectionById(req: Request, res: Response) {
  try {
    const section = await storage.getContentSectionById(req.params.id);
    if (!section) return res.status(404).json({ error: "Content section not found" });
    res.json(section);
  } catch (error) {
    console.error("Error fetching content section:", error);
    res.status(500).json({ error: "Failed to fetch content section" });
  }
}

export async function createContentSection(req: Request, res: Response) {
  try {
    const section = await storage.createContentSection(req.body);
    res.json(section);
  } catch (error) {
    console.error("Error creating content section:", error);
    res.status(500).json({ error: "Failed to create content section" });
  }
}

export async function updateContentSection(req: Request, res: Response) {
  try {
    const section = await storage.updateContentSection(req.params.id, req.body);
    if (!section) return res.status(404).json({ error: "Content section not found" });
    res.json(section);
  } catch (error) {
    console.error("Error updating content section:", error);
    res.status(500).json({ error: "Failed to update content section" });
  }
}

export async function deleteContentSection(req: Request, res: Response) {
  try {
    const success = await storage.deleteContentSection(req.params.id);
    if (!success) return res.status(404).json({ error: "Content section not found" });
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting content section:", error);
    res.status(500).json({ error: "Failed to delete content section" });
  }
}

export async function publishContentSection(req: Request, res: Response) {
  try {
    const section = await storage.publishContentSection(req.params.id);
    if (!section) return res.status(404).json({ error: "Content section not found" });
    res.json(section);
  } catch (error) {
    console.error("Error publishing content section:", error);
    res.status(500).json({ error: "Failed to publish content section" });
  }
}

export async function getContentVersions(req: Request, res: Response) {
  try {
    const versions = await storage.getContentVersions(req.params.id);
    res.json(versions);
  } catch (error) {
    console.error("Error fetching content versions:", error);
    res.status(500).json({ error: "Failed to fetch versions" });
  }
}

// News
export async function getAdminNews(req: Request, res: Response) {
  try {
    const news = await storage.getAdminNews();
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}

export async function getAdminNewsById(req: Request, res: Response) {
  try {
    const news = await storage.getAdminNewsById(req.params.id);
    if (!news) return res.status(404).json({ error: "News item not found" });
    res.json(news);
  } catch (error) {
    console.error("Error fetching news item:", error);
    res.status(500).json({ error: "Failed to fetch news item" });
  }
}

export async function createAdminNews(req: Request, res: Response) {
  try {
    const news = await storage.createAdminNews(req.body);
    res.json(news);
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ error: "Failed to create news" });
  }
}

export async function updateAdminNews(req: Request, res: Response) {
  try {
    const news = await storage.updateAdminNews(req.params.id, req.body);
    if (!news) return res.status(404).json({ error: "News item not found" });
    res.json(news);
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ error: "Failed to update news" });
  }
}

export async function deleteAdminNews(req: Request, res: Response) {
  try {
    const success = await storage.deleteAdminNews(req.params.id);
    if (!success) return res.status(404).json({ error: "News item not found" });
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ error: "Failed to delete news" });
  }
}

export async function publishAdminNews(req: Request, res: Response) {
  try {
    const news = await storage.publishAdminNews(req.params.id);
    if (!news) return res.status(404).json({ error: "News item not found" });
    res.json(news);
  } catch (error) {
    console.error("Error publishing news:", error);
    res.status(500).json({ error: "Failed to publish news" });
  }
}

// User profiles
export async function getUsers(req: Request, res: Response) {
  try {
    const filters = req.query;
    const users = await storage.getUsers(filters);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function getUserStats(req: Request, res: Response) {
  try {
    const stats = await storage.getUserStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Failed to fetch user stats" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await storage.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const user = await storage.createUser(req.body);
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await storage.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const success = await storage.deleteUser(req.params.id);
    if (!success) return res.status(404).json({ error: "User not found" });
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
}

// Game Scores & Leaderboard
export async function getGameScores(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;
    const scores = await storage.getGameScores(userId);
    res.json(scores);
  } catch (error) {
    console.error("Error fetching game scores:", error);
    res.status(500).json({ error: "Failed to fetch game scores" });
  }
}

export async function getLeaderboard(req: Request, res: Response) {
  try {
    const gameType = req.query.gameType as string;
    const limit = parseInt(req.query.limit as string) || 10;
    const leaderboard = await storage.getLeaderboard(gameType, limit);
    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
}

// Audit logs & Analytics summary
export async function getAuditLogs(req: Request, res: Response) {
  try {
    const filters = req.query;
    const logs = await storage.getAuditLogs(filters);
    res.json(logs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
}

export async function createAuditLog(req: Request, res: Response) {
  try {
    const log = await storage.createAuditLog(req.body);
    res.json(log);
  } catch (error) {
    console.error("Error creating audit log:", error);
    res.status(500).json({ error: "Failed to create audit log" });
  }
}

export async function getAnalyticsSummary(req: Request, res: Response) {
  try {
    const summary = await storage.getAnalyticsSummary();
    res.json(summary);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
}
