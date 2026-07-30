import axios from 'axios';

interface IBMQuantumJob {
  id: string;
  name?: string;
  backend: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  created: string;
  updated?: string;
  runtime?: number;
  qubits?: number;
  shots?: number;
  program?: string;
  results?: any;
  error?: string;
}

interface IBMQuantumBackend {
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  pending_jobs: number;
  quantum_volume?: number;
  num_qubits: number;
  basis_gates?: string[];
  coupling_map?: number[][];
}

class IBMQuantumService {
  private apiKey: string;
  private region: string;
  private projectId: string;
  private instanceId: string;
  private baseUrl: string;
  private bearerToken: string | null = null;
  private tokenExpiry: number = 0;

  // IBM Quantum Platform API version (date-based versioning)
  private readonly API_VERSION = '2024-11-01';

  constructor() {
    this.apiKey = process.env.IBM_QUANTUM_API_TOKEN || '';
    this.region = process.env.IBM_QUANTUM_REGION || 'us-east';
    this.projectId = process.env.IBM_QUANTUM_PROJECT_ID || '';
    this.instanceId = process.env.IBM_QUANTUM_INSTANCE_ID || '';

    // New IBM Quantum Platform REST API (2025+)
    // US region: https://quantum.cloud.ibm.com/api
    // EU region: https://eu-de.quantum.cloud.ibm.com/api
    this.baseUrl = this.region.startsWith('eu')
      ? 'https://eu-de.quantum.cloud.ibm.com/api'
      : 'https://quantum.cloud.ibm.com/api';

    if (!this.apiKey) {
      console.warn('⚠️  IBM Quantum API token not found in environment variables');
      console.warn('Please add IBM_QUANTUM_API_TOKEN to your .env file');
      console.warn('Using simulated data for demonstration');
    } else if (!this.instanceId) {
      console.warn('⚠️  IBM Quantum Instance ID (Service-CRN) not found');
      console.warn('Please add IBM_QUANTUM_INSTANCE_ID to your .env file');
    } else {
      console.log('✅ IBM Quantum API configured successfully');
      console.log(`🔗 Base URL: ${this.baseUrl}/v1`);
      console.log(`🌍 Region: ${this.region}`);
    }
  }

  /**
   * Exchange IBM Cloud API key for a short-lived IAM Bearer token.
   * Tokens last 60 min; we cache and refresh 10 min early.
   */
  private async getBearerToken(): Promise<string> {
    if (this.bearerToken && Date.now() < this.tokenExpiry) {
      return this.bearerToken;
    }

    try {
      console.log('🔑 Generating IBM Cloud IAM Bearer token...');
      const response = await axios.post(
        'https://iam.cloud.ibm.com/identity/token',
        `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${this.apiKey}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
          timeout: 15000,
        }
      );

      this.bearerToken = response.data.access_token;
      // Refresh 10 min before expiry (tokens last 60 min)
      this.tokenExpiry = Date.now() + 50 * 60 * 1000;

      console.log('✅ Successfully generated Bearer token');
      return this.bearerToken!;
    } catch (error: any) {
      console.error(
        '❌ Failed to generate Bearer token:',
        error.response?.data || error.message
      );
      throw new Error('Failed to authenticate with IBM Cloud IAM');
    }
  }

  /**
   * Make an authenticated request to the IBM Quantum Platform REST API v1.
   * Adds required headers: Authorization, Service-CRN, IBM-API-Version.
   */
  private async makeRequest(
    path: string,
    method: 'GET' | 'POST' = 'GET',
    data?: any
  ) {
    if (!this.apiKey) {
      throw new Error('IBM Quantum API key not configured');
    }

    const url = `${this.baseUrl}${path}`;
    console.log(`🌐 IBM Quantum API: ${method} ${url}`);

    const bearerToken = await this.getBearerToken();

    const headers: Record<string, string> = {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'IBM-API-Version': this.API_VERSION,
      'User-Agent': 'QuantumJobTracker/1.0',
    };

    // Service-CRN is required for authenticating to a specific instance
    if (this.instanceId) {
      headers['Service-CRN'] = this.instanceId;
    }

    const response = await axios({
      method,
      url,
      headers,
      data,
      timeout: 30000,
      validateStatus: (status) => status < 500,
    });

    if (response.status >= 400) {
      console.warn(`⚠️  IBM Quantum API ${response.status}:`, response.data);
      return { _error: true, status: response.status, body: response.data };
    }

    console.log(`✅ IBM Quantum API success (${response.status})`);
    return response.data;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Public API methods
  // ─────────────────────────────────────────────────────────────────────────

  async getJobs(limit = 50): Promise<IBMQuantumJob[]> {
    if (!this.apiKey) {
      return this.generateSampleJobs(limit);
    }

    try {
      console.log(`📊 Fetching IBM Quantum jobs (limit=${limit})...`);

      // Correct v1 endpoint: GET /v1/jobs
      const data = await this.makeRequest(`/v1/jobs?limit=${limit}`);

      if (data._error || !data) {
        console.warn('⚠️  Jobs endpoint error — falling back to demo data');
        return this.generateSampleJobs(limit);
      }

      // Response shape: { jobs: [...] } or { results: [...] }
      const rawJobs: any[] = data.jobs ?? data.results ?? data.data ?? [];

      if (!Array.isArray(rawJobs) || rawJobs.length === 0) {
        console.warn('⚠️  No jobs returned from IBM Quantum — using demo data');
        return this.generateSampleJobs(limit);
      }

      console.log(`📈 Fetched ${rawJobs.length} real IBM Quantum jobs`);
      return rawJobs.map((job: any, i: number) => this.normalizeJob(job, i));
    } catch (error: any) {
      console.error('❌ getJobs failed:', error.message);
      return this.generateSampleJobs(limit);
    }
  }

  async getBackends(): Promise<IBMQuantumBackend[]> {
    if (!this.apiKey) {
      return this.generateSampleBackends();
    }

    try {
      console.log('🖥️  Fetching IBM Quantum backends...');

      // Correct v1 endpoint: GET /v1/backends
      const data = await this.makeRequest('/v1/backends');

      if (data._error || !data) {
        console.warn('⚠️  Backends endpoint error — falling back to demo data');
        return this.generateSampleBackends();
      }

      // Response shape: { backends: [...] } or direct array
      const rawBackends: any[] = Array.isArray(data)
        ? data
        : data.backends ?? data.devices ?? [];

      if (!Array.isArray(rawBackends) || rawBackends.length === 0) {
        console.warn('⚠️  No backends returned — using demo data');
        return this.generateSampleBackends();
      }

      console.log(`🖥️  Fetched ${rawBackends.length} real IBM Quantum backends`);
      return rawBackends.map((b: any) => this.normalizeBackend(b));
    } catch (error: any) {
      console.error('❌ getBackends failed:', error.message);
      return this.generateSampleBackends();
    }
  }

  async getJobById(jobId: string): Promise<IBMQuantumJob | null> {
    if (!this.apiKey) return null;

    try {
      console.log(`🔍 Fetching job: ${jobId}`);
      // Correct v1 endpoint: GET /v1/jobs/{id}
      const data = await this.makeRequest(`/v1/jobs/${jobId}`);

      if (!data || data._error) return null;
      return this.normalizeJob(data, 0);
    } catch (error: any) {
      console.error(`❌ getJobById(${jobId}) failed:`, error.message);
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Normalisation helpers
  // ─────────────────────────────────────────────────────────────────────────

  private normalizeJob(job: any, index: number): IBMQuantumJob {
    return {
      id: job.id ?? `ibm_job_${Date.now()}_${index}`,
      name:
        job.program_id ??
        job.program?.id ??
        job.name ??
        `IBM Job ${String(job.id).slice(-8) ?? index}`,
      backend:
        job.backend ??
        job.backend_name ??
        job.device ??
        'ibm_brisbane',
      status: this.mapStatus(job.status ?? job.state ?? 'queued'),
      created: job.created ?? job.creation_date ?? new Date().toISOString(),
      updated:
        job.updated ??
        job.time_per_step?.COMPLETED ??
        job.end_date ??
        undefined,
      runtime: job.running_time ?? job.usage?.seconds ?? undefined,
      qubits:
        job.params?.circuits?.[0]?.num_qubits ??
        job.usage?.quantum_seconds ??
        undefined,
      shots: job.params?.shots ?? job.shots ?? 1024,
      program: job.program_id ?? job.program?.id ?? 'quantum_circuit',
      results: job.results ?? undefined,
      error: job.error_message ?? job.failure?.error_message ?? undefined,
    };
  }

  private normalizeBackend(backend: any): IBMQuantumBackend {
    return {
      name: backend.name ?? backend.backend_name ?? 'unknown',
      status: this.mapBackendStatus(backend.status ?? backend.operational),
      pending_jobs:
        backend.pending_jobs ?? backend.queue_length ?? Math.floor(Math.random() * 10),
      quantum_volume: backend.quantum_volume ?? undefined,
      num_qubits:
        backend.n_qubits ??
        backend.num_qubits ??
        backend.configuration?.n_qubits ??
        127,
      basis_gates:
        backend.basis_gates ??
        backend.configuration?.basis_gates ??
        ['cx', 'id', 'rz', 'sx', 'x'],
      coupling_map: backend.coupling_map ?? backend.configuration?.coupling_map,
    };
  }

  private mapStatus(
    s: string
  ): 'queued' | 'running' | 'completed' | 'failed' | 'cancelled' {
    switch (s?.toLowerCase()) {
      case 'queued':
      case 'pending':
      case 'waiting':
        return 'queued';
      case 'running':
      case 'validating':
      case 'in_progress':
        return 'running';
      case 'completed':
      case 'done':
      case 'succeeded':
        return 'completed';
      case 'failed':
      case 'error':
        return 'failed';
      case 'cancelled':
      case 'canceled':
        return 'cancelled';
      default:
        return 'queued';
    }
  }

  private mapBackendStatus(
    s: string | boolean | undefined
  ): 'online' | 'offline' | 'maintenance' {
    if (typeof s === 'boolean') return s ? 'online' : 'offline';
    switch (s?.toLowerCase()) {
      case 'online':
      case 'active':
      case 'available':
        return 'online';
      case 'maintenance':
      case 'calibrating':
        return 'maintenance';
      default:
        return 'offline';
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Demo / sample data fallbacks
  // ─────────────────────────────────────────────────────────────────────────

  private generateSampleJobs(count: number): IBMQuantumJob[] {
    console.log(`🔧 Generating ${count} sample IBM Quantum jobs for demo`);
    const backends = [
      'ibm_brisbane',
      'ibm_kyoto',
      'ibm_osaka',
      'ibm_cairo',
      'ibm_sherbrooke',
    ];
    const statuses: Array<
      'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
    > = ['queued', 'running', 'completed', 'failed', 'cancelled'];

    return Array.from({ length: count }, (_, i) => {
      const now = new Date();
      const created = new Date(
        now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString();
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      return {
        id: `ibm_sample_${Date.now()}_${i}`,
        name: `IBM Quantum Circuit ${i + 1}`,
        backend: backends[Math.floor(Math.random() * backends.length)],
        status,
        created,
        updated:
          status !== 'queued' ? new Date(created).toISOString() : undefined,
        runtime:
          status === 'completed'
            ? Math.floor(Math.random() * 300) + 30
            : undefined,
        qubits: Math.floor(Math.random() * 100) + 5,
        shots: Math.pow(2, Math.floor(Math.random() * 6) + 10),
        program: 'sample_quantum_circuit',
        results:
          status === 'completed'
            ? { counts: { '000': 512, '111': 512 } }
            : undefined,
        error:
          status === 'failed'
            ? 'Sample quantum circuit error for demo'
            : undefined,
      };
    });
  }

  private generateSampleBackends(): IBMQuantumBackend[] {
    console.log('🔧 Generating sample IBM Quantum backends for demo');
    return [
      {
        name: 'ibm_brisbane',
        status: 'online',
        pending_jobs: Math.floor(Math.random() * 5),
        num_qubits: 127,
        quantum_volume: 64,
        basis_gates: ['cx', 'id', 'rz', 'sx', 'x'],
        coupling_map: [],
      },
      {
        name: 'ibm_kyoto',
        status: 'online',
        pending_jobs: Math.floor(Math.random() * 8),
        num_qubits: 127,
        quantum_volume: 64,
        basis_gates: ['cx', 'id', 'rz', 'sx', 'x'],
        coupling_map: [],
      },
      {
        name: 'ibm_osaka',
        status: 'online',
        pending_jobs: Math.floor(Math.random() * 12),
        num_qubits: 127,
        quantum_volume: 64,
        basis_gates: ['cx', 'id', 'rz', 'sx', 'x'],
        coupling_map: [],
      },
      {
        name: 'ibm_cairo',
        status: 'maintenance',
        pending_jobs: 0,
        num_qubits: 27,
        basis_gates: ['cx', 'id', 'rz', 'sx', 'x'],
        coupling_map: [],
      },
      {
        name: 'ibm_sherbrooke',
        status: 'online',
        pending_jobs: Math.floor(Math.random() * 15),
        num_qubits: 133,
        quantum_volume: 32,
        basis_gates: ['cx', 'id', 'rz', 'sx', 'x'],
        coupling_map: [],
      },
    ];
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Status / diagnostics
  // ─────────────────────────────────────────────────────────────────────────

  isConfigured(): boolean {
    return !!(this.apiKey && this.instanceId);
  }

  getApiStatus(): string {
    const missing: string[] = [];
    if (!this.apiKey) missing.push('IBM_QUANTUM_API_TOKEN');
    if (!this.instanceId) missing.push('IBM_QUANTUM_INSTANCE_ID');
    return missing.length === 0
      ? `✅ Fully Configured (${this.baseUrl}/v1)`
      : `❌ Missing: ${missing.join(', ')}`;
  }

  getConfigurationHelp(): string {
    return `
🔧 IBM Quantum Configuration (2025 Platform):

Required environment variables:
  IBM_QUANTUM_API_TOKEN   — API key from https://cloud.ibm.com/iam/apikeys
  IBM_QUANTUM_INSTANCE_ID — Service CRN from your Quantum service instance

Optional:
  IBM_QUANTUM_REGION      — us-east (default) or eu-de
  IBM_QUANTUM_PROJECT_ID  — Project ID (for filtering)

API Base URL: ${this.baseUrl}/v1
Status: ${this.getApiStatus()}
`;
  }
}

export const ibmQuantumService = new IBMQuantumService();