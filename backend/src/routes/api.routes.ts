import { Router } from "express";
import * as jobsController from "../controllers/jobs.controller";
import * as sessionsController from "../controllers/sessions.controller";
import * as backendsController from "../controllers/backends.controller";
import * as analyticsController from "../controllers/analytics.controller";
import * as exportController from "../controllers/export.controller";
import * as workspacesController from "../controllers/workspaces.controller";
import * as projectsController from "../controllers/projects.controller";
import * as quantumController from "../controllers/quantum.controller";
import * as aiController from "../controllers/ai.controller";
import * as teamworkController from "../controllers/teamwork.controller";
import { getHealthStatus } from "../monitoring/health";

export const apiRouter = Router();

// Health Check
apiRouter.get("/health", getHealthStatus);

// Jobs endpoints
apiRouter.get("/jobs", jobsController.getJobs);
apiRouter.get("/jobs/search", jobsController.searchJobs);
apiRouter.get("/jobs/status/:status", jobsController.getJobsByStatus);
apiRouter.get("/jobs/:id", jobsController.getJobById);
apiRouter.post("/jobs", jobsController.createJob);
apiRouter.patch("/jobs/:id/status", jobsController.updateJobStatus);
apiRouter.delete("/jobs/:id", jobsController.deleteJob);

// Sessions endpoints
apiRouter.get("/sessions", sessionsController.getSessions);
apiRouter.post("/sessions", sessionsController.createSession);

// Backends endpoints
apiRouter.get("/backends", backendsController.getBackends);

// Analytics endpoints
apiRouter.get("/analytics/stats", analyticsController.getJobStats);
apiRouter.get("/analytics/trends", analyticsController.getTrends);

// Sync endpoints
apiRouter.get("/sync/ibm/status", quantumController.getSyncStatus);
apiRouter.post("/sync/ibm", quantumController.triggerSync);
apiRouter.get("/ibm-quantum/live", quantumController.getLiveData);

// Export endpoints
apiRouter.get("/export/csv", exportController.exportCSV);
apiRouter.get("/export/json", exportController.exportJSON);

// Workspaces endpoints
apiRouter.get("/workspaces", workspacesController.getWorkspaces);
apiRouter.get("/workspaces/search", workspacesController.searchWorkspaces);
apiRouter.get("/workspaces/:id", workspacesController.getWorkspaceById);
apiRouter.post("/workspaces", workspacesController.createWorkspace);
apiRouter.patch("/workspaces/:id", workspacesController.updateWorkspace);
apiRouter.delete("/workspaces/:id", workspacesController.deleteWorkspace);

// Workspace Members endpoints
apiRouter.get("/workspaces/:workspaceId/members", workspacesController.getWorkspaceMembers);
apiRouter.post("/workspaces/:workspaceId/members", workspacesController.addWorkspaceMember);
apiRouter.patch("/workspace-members/:id", workspacesController.updateWorkspaceMember);
apiRouter.delete("/workspace-members/:id", workspacesController.removeWorkspaceMember);

// Projects endpoints
apiRouter.get("/projects", projectsController.getProjects);
apiRouter.get("/projects/search", projectsController.searchProjects);
apiRouter.get("/workspaces/:workspaceId/projects", projectsController.getProjectsByWorkspace);
apiRouter.get("/projects/:id", projectsController.getProjectById);
apiRouter.post("/projects", projectsController.createProject);
apiRouter.patch("/projects/:id", projectsController.updateProject);
apiRouter.delete("/projects/:id", projectsController.deleteProject);

// Project Collaborators endpoints
apiRouter.get("/projects/:projectId/collaborators", projectsController.getProjectCollaborators);
apiRouter.post("/projects/:projectId/collaborators", projectsController.addProjectCollaborator);
apiRouter.patch("/project-collaborators/:id", projectsController.updateProjectCollaborator);
apiRouter.delete("/project-collaborators/:id", projectsController.removeProjectCollaborator);

// Quantum Quest simulation endpoints
apiRouter.post("/quantum/submit-job", quantumController.submitQuestJob);
apiRouter.get("/quantum/jobs/:jobId", quantumController.getQuestJob);

// AI Assistant endpoints
apiRouter.post("/ai/job-suggestions", aiController.getJobSuggestions);
apiRouter.post("/ai/analyze-failure/:jobId", aiController.analyzeFailure);
apiRouter.post("/ai/circuit-instructions/:jobId", aiController.getCircuitInstructions);
apiRouter.post("/ai/guided-improvements/:jobId", aiController.getGuidedImprovements);
apiRouter.post("/ai/generate-circuit", aiController.generateCircuitCode);
apiRouter.post("/ai/chat", aiController.chat);
apiRouter.get("/ai/status", aiController.getAiStatus);

// Admin - Pricing Plans endpoints
apiRouter.get("/admin/pricing-plans", teamworkController.getPricingPlans);
apiRouter.get("/admin/pricing-plans/:id", teamworkController.getPricingPlanById);
apiRouter.post("/admin/pricing-plans", teamworkController.createPricingPlan);
apiRouter.patch("/admin/pricing-plans/:id", teamworkController.updatePricingPlan);
apiRouter.delete("/admin/pricing-plans/:id", teamworkController.deletePricingPlan);
apiRouter.post("/admin/pricing-plans/:id/publish", teamworkController.publishPricingPlan);
apiRouter.get("/admin/pricing-plans/:id/versions", teamworkController.getPricingPlanVersions);

// Admin - Content Management endpoints
apiRouter.get("/admin/content", teamworkController.getContentSections);
apiRouter.get("/admin/content/:id", teamworkController.getContentSectionById);
apiRouter.post("/admin/content", teamworkController.createContentSection);
apiRouter.patch("/admin/content/:id", teamworkController.updateContentSection);
apiRouter.delete("/admin/content/:id", teamworkController.deleteContentSection);
apiRouter.post("/admin/content/:id/publish", teamworkController.publishContentSection);
apiRouter.get("/admin/content/:id/versions", teamworkController.getContentVersions);

// Admin - News endpoints
apiRouter.get("/admin/news", teamworkController.getAdminNews);
apiRouter.get("/admin/news/:id", teamworkController.getAdminNewsById);
apiRouter.post("/admin/news", teamworkController.createAdminNews);
apiRouter.patch("/admin/news/:id", teamworkController.updateAdminNews);
apiRouter.delete("/admin/news/:id", teamworkController.deleteAdminNews);
apiRouter.post("/admin/news/:id/publish", teamworkController.publishAdminNews);

// Admin - Users endpoints
apiRouter.get("/admin/users", teamworkController.getUsers);
apiRouter.get("/admin/users/stats", teamworkController.getUserStats);
apiRouter.get("/admin/users/:id", teamworkController.getUserById);
apiRouter.post("/admin/users", teamworkController.createUser);
apiRouter.patch("/admin/users/:id", teamworkController.updateUser);
apiRouter.delete("/admin/users/:id", teamworkController.deleteUser);

// Admin - Game Scores endpoints
apiRouter.get("/admin/game-scores", teamworkController.getGameScores);
apiRouter.get("/admin/leaderboard", teamworkController.getLeaderboard);

// Admin - Audit Logs endpoints
apiRouter.get("/admin/audit-logs", teamworkController.getAuditLogs);
apiRouter.post("/admin/audit-logs", teamworkController.createAuditLog);

// Admin - Analytics Summary endpoints
apiRouter.get("/admin/analytics", teamworkController.getAnalyticsSummary);
