"use client";

import React from "react";
import { ServerData, ServerStatus } from "@/lib/mock-data";
import { Shield, AlertTriangle, Search, ShieldOff, CheckCircle, Settings } from "lucide-react";

/**
 * StatusCard - Displays server status with colored indicators and metrics
 * Matches the dashboard screenshot style
 */
interface StatusCardProps {
  server: ServerData;
}

const statusConfig: Record<
  ServerStatus,
  { color: string; bgColor: string; icon: React.ReactNode; label: string }
> = {
  secure: {
    color: "text-emerald-500",
    bgColor: "bg-card/50 border-border/50",
    icon: <CheckCircle className="h-5 w-5" />,
    label: "ACTIVE",
  },
  threat: {
    color: "text-red-500",
    bgColor: "bg-red-500/5 border-red-500/30",
    icon: <AlertTriangle className="h-5 w-5" />,
    label: "THREAT",
  },
  analyzing: {
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/5 border-yellow-500/30",
    icon: <Search className="h-5 w-5" />,
    label: "ANALYZING",
  },
};

const serverIcons: Record<string, React.ReactNode> = {
  "Negative Server": (
    <div className="p-3 rounded-lg bg-red-500/10">
      <ShieldOff className="h-6 w-6 text-red-400" />
    </div>
  ),
  "Positive Server": (
    <div className="p-3 rounded-lg bg-emerald-500/10">
      <Shield className="h-6 w-6 text-emerald-400" />
    </div>
  ),
  "Orchestrator": (
    <div className="p-3 rounded-lg bg-blue-500/10">
      <Settings className="h-6 w-6 text-blue-400" />
    </div>
  ),
};

export function StatusCard({ server }: StatusCardProps) {
  const config = statusConfig[server.status];

  return (
    <div
      className={`rounded-xl border ${config.bgColor} p-6 transition-all hover:border-primary/30`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {serverIcons[server.name]}
          <div>
            <h3 className="font-semibold text-foreground">{server.name}</h3>
            <p className="text-xs text-muted-foreground">{server.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
                server.status === "secure"
                  ? "bg-emerald-500"
                  : server.status === "threat"
                    ? "bg-red-500"
                    : "bg-yellow-500"
              } opacity-75`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                server.status === "secure"
                  ? "bg-emerald-500"
                  : server.status === "threat"
                    ? "bg-red-500"
                    : "bg-yellow-500"
              }`}
            />
          </span>
          <span className={`font-mono text-xs font-bold ${config.color}`}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-2xl font-mono font-bold text-foreground">
            {server.cpu}%
          </p>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            CPU
          </p>
        </div>
        <div>
          <p className="text-2xl font-mono font-bold text-foreground">
            {server.memory}%
          </p>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Memory
          </p>
        </div>
        <div>
          <p className="text-2xl font-mono font-bold text-foreground">
            {server.requests}
          </p>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Requests
          </p>
        </div>
      </div>
    </div>
  );
}
