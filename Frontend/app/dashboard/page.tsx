"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatusCard } from "@/components/dashboard/status-card";
import { ThreatLogTable } from "@/components/dashboard/threat-log-table";
import { MetricsPanel } from "@/components/dashboard/metrics-panel";
import { QueryInbox } from "@/components/dashboard/query-inbox";
import {
  ServerData,
  ThreatLog,
  SystemMetrics,
  fetchServerStatus,
  fetchThreatLogs,
  fetchSystemMetrics,
} from "@/lib/mock-data";
import { RefreshCw, Grid2X2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Dashboard Page - AEGIS Defense Grid SOC Console
 * Displays server status, threat logs, system metrics, and payload testing inbox
 */
export default function DashboardPage() {
  const [servers, setServers] = useState<ServerData[]>([]);
  const [threats, setThreats] = useState<ThreatLog[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch all data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [serverData, threatData, metricsData] = await Promise.all([
        fetchServerStatus(),
        fetchThreatLogs(),
        fetchSystemMetrics(),
      ]);
      setServers(serverData);
      setThreats(threatData);
      setMetrics(metricsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617]">
      <DashboardHeader />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Defense Console
            </h1>
            <p className="text-sm text-muted-foreground">
              Real-time monitoring and threat analysis
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-mono">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              disabled={isLoading}
              className="font-mono border-border hover:border-primary hover:text-primary bg-transparent"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Metrics Panel */}
        {metrics && (
          <div className="mb-8">
            <MetricsPanel metrics={metrics} />
          </div>
        )}

        {/* Server Status Cards */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Grid2X2 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">
              System Components
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isLoading && servers.length === 0
              ? // Loading skeletons
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border/50 bg-card/30 p-6 animate-pulse"
                  >
                    <div className="h-4 bg-secondary rounded w-3/4 mb-4" />
                    <div className="h-3 bg-secondary rounded w-1/2 mb-4" />
                    <div className="h-6 bg-secondary rounded w-1/3" />
                  </div>
                ))
              : servers.map((server) => (
                  <StatusCard key={server.id} server={server} />
                ))}
          </div>
        </div>

        {/* Two Column Layout: Threat Logs & Query Inbox */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Threat Logs */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                Recent Threat Logs
              </h2>
            </div>
            {threats.length > 0 ? (
              <ThreatLogTable logs={threats} />
            ) : (
              <div className="rounded-xl border border-border/50 bg-card/30 p-8 text-center">
                <p className="text-muted-foreground font-mono">
                  Loading threat data...
                </p>
              </div>
            )}
          </div>

          {/* Query Inbox for SQL Injection Testing */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                Payload Analysis Inbox
              </h2>
            </div>
            <QueryInbox />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground/60 font-mono">
            AEGIS Defense Grid v1.0.0 | Secure Connection Established |
            Encryption: AES-256-GCM
          </p>
        </footer>
      </main>
    </div>
  );
}
