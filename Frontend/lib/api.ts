// api.ts - Connects to your Go Backend (Port 8080)

const API_BASE = "http://localhost:8080/api";

export interface AnalysisResponse {
  verdict: string;     // "SAFE" or "DANGER"
  destination: string; // e.g. "Shadow Trap :8082"
  details: string;
}

// 1. Send Payload to Go Backend
export async function analyzePayload(query: string): Promise<AnalysisResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error("Backend connection failed");
    return await res.json();
  } catch (error) {
    console.error("Analysis Error:", error);
    return null;
  }
}

// 2. Mock Data Generators (Since backend lacks these endpoints currently)
// You can remove these once you add storage to your main.go
export const getMockServers = () => [
  { id: "1", name: "GATEKEEPER_PROXY", status: "online", load: 34, ip: "127.0.0.1:8080" },
  { id: "2", name: "SHADOW_TRAP", status: "active", load: 12, ip: "127.0.0.1:8082" },
  { id: "3", name: "NEURAL_CORE", status: "online", load: 65, ip: "127.0.0.1:3000" },
];