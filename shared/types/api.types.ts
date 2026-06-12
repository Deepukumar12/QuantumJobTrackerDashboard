import type { Job } from "../schemas/schema";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string | any;
}

export interface PaginatedResponse<T> {
  jobs: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalJobs: number;
    limit: number;
  };
}

export interface SyncStatusResponse {
  configured: boolean;
  status: string;
  lastSync: string;
  endpoints: {
    runtime: string;
    auth: string;
  };
}
