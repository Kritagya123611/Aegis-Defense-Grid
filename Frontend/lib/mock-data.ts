/**
 * Mock data for AEGIS Defense Grid Dashboard
 * Simulates real-time threat detection and system status
 */

// Server status types
export type ServerStatus = "secure" | "threat" | "analyzing";

// Server data structure
export interface ServerData {
  id: string;
  name: string;
  description: string;
  status: ServerStatus;
  cpu: number;
  memory: number;
  requests: string;
  endpoint: string;
}

// Threat log entry
export interface ThreatLog {
  id: string;
  timestamp: string;
  attackType: string;
  attackCode: string;
  sourceIp: string;
  targetEndpoint: string;
  severity: "critical" | "high" | "medium" | "low";
  remediationStatus: "blocked" | "quarantined" | "investigating" | "resolved";
}

// System metrics
export interface SystemMetrics {
  threatsBlocked24h: number;
  activeDefenseRules: number;
  systemUptime: string;
  avgResponseTime: string;
}

// Mock server data
export const serverData: ServerData[] = [
  {
    id: "negative-001",
    name: "Negative Server",
    description: "Threat Detection Engine",
    status: "secure",
    cpu: 34,
    memory: 62,
    requests: "2.4k/s",
    endpoint: "/api/negative",
  },
  {
    id: "positive-001",
    name: "Positive Server",
    description: "Stable System Core",
    status: "secure",
    cpu: 28,
    memory: 45,
    requests: "1.8k/s",
    endpoint: "/api/positive",
  },
  {
    id: "orchestrator-001",
    name: "Orchestrator",
    description: "Central Command",
    status: "secure",
    cpu: 41,
    memory: 58,
    requests: "856/s",
    endpoint: "/api/orchestrator",
  },
];

// Mock threat logs with realistic SQL injection attempts
export const threatLogs: ThreatLog[] = [
  {
    id: "thr-001",
    timestamp: "2026-02-04T19:58:03Z",
    attackType: "XSS",
    attackCode: "<script>alert(1)</script>",
    sourceIp: "10.0.0.42",
    targetEndpoint: "/comments",
    severity: "high",
    remediationStatus: "blocked",
  },
  {
    id: "thr-002",
    timestamp: "2026-02-04T19:52:17Z",
    attackType: "SQL Injection",
    attackCode: "' OR '1'='1",
    sourceIp: "192.168.45.123",
    targetEndpoint: "/api/login",
    severity: "critical",
    remediationStatus: "blocked",
  },
  {
    id: "thr-003",
    timestamp: "2026-02-04T19:48:42Z",
    attackType: "SQL Injection",
    attackCode: "1; DROP TABLE users--",
    sourceIp: "10.0.0.87",
    targetEndpoint: "/api/users",
    severity: "critical",
    remediationStatus: "blocked",
  },
  {
    id: "thr-004",
    timestamp: "2026-02-04T19:45:18Z",
    attackType: "Path Traversal",
    attackCode: "../../../etc/passwd",
    sourceIp: "172.16.0.45",
    targetEndpoint: "/api/files",
    severity: "high",
    remediationStatus: "quarantined",
  },
  {
    id: "thr-005",
    timestamp: "2026-02-04T19:42:33Z",
    attackType: "Command Injection",
    attackCode: "; cat /etc/shadow |",
    sourceIp: "203.0.113.78",
    targetEndpoint: "/api/exec",
    severity: "critical",
    remediationStatus: "blocked",
  },
  {
    id: "thr-006",
    timestamp: "2026-02-04T19:38:56Z",
    attackType: "SQL Injection",
    attackCode: "UNION SELECT * FROM creds",
    sourceIp: "198.51.100.22",
    targetEndpoint: "/api/search",
    severity: "high",
    remediationStatus: "blocked",
  },
];

// Mock system metrics
export const systemMetrics: SystemMetrics = {
  threatsBlocked24h: 1247,
  activeDefenseRules: 42,
  systemUptime: "99.97%",
  avgResponseTime: "47ms",
};

// Placeholder fetch function for future Golang backend integration
export async function fetchServerStatus(): Promise<ServerData[]> {
  // TODO: Replace with actual API call to Golang backend
  // const response = await fetch('http://localhost:8080/api/servers');
  // return response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(serverData), 500);
  });
}

export async function fetchThreatLogs(): Promise<ThreatLog[]> {
  // TODO: Replace with actual API call to Golang backend
  // const response = await fetch('http://localhost:8080/api/threats');
  // return response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(threatLogs), 500);
  });
}

export async function fetchSystemMetrics(): Promise<SystemMetrics> {
  // TODO: Replace with actual API call to Golang backend
  // const response = await fetch('http://localhost:8080/api/metrics');
  // return response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(systemMetrics), 500);
  });
}
