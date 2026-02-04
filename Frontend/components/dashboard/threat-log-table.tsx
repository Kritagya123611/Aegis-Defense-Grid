"use client";

import React, { useState } from "react";
import { ThreatLog } from "@/lib/mock-data";
import { AlertTriangle, ShieldCheck } from "lucide-react";

/**
 * ThreatLogTable - Live Threat Feed with filtering
 */
interface ThreatLogTableProps {
  logs: ThreatLog[];
}

const severityConfig: Record<ThreatLog["severity"], { color: string; dotColor: string }> = {
  critical: { color: "text-red-500", dotColor: "bg-red-500" },
  high: { color: "text-orange-500", dotColor: "bg-orange-500" },
  medium: { color: "text-yellow-500", dotColor: "bg-yellow-500" },
  low: { color: "text-blue-500", dotColor: "bg-blue-500" },
};

const remediationConfig: Record<
  ThreatLog["remediationStatus"],
  { color: string; bgColor: string; label: string }
> = {
  blocked: {
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
    label: "BLOCKED",
  },
  quarantined: {
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    label: "QUARANTINED",
  },
  investigating: {
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    label: "INVESTIGATING",
  },
  resolved: {
    color: "text-muted-foreground",
    bgColor: "bg-muted/20",
    label: "RESOLVED",
  },
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function ThreatLogTable({ logs }: ThreatLogTableProps) {
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium">("all");

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    return log.severity === filter;
  });

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <h2 className="font-semibold text-foreground">Live Threat Feed</h2>
        </div>
        <div className="flex items-center gap-2">
          {(["all", "critical", "high", "medium"] as const).map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => setFilter(level)}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                filter === level
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Logs */}
      <div className="divide-y divide-border/30">
        {filteredLogs.map((log) => {
          const severity = severityConfig[log.severity];
          const remediation = remediationConfig[log.remediationStatus];

          return (
            <div
              key={log.id}
              className="px-6 py-4 hover:bg-secondary/10 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <span className={`h-2 w-2 rounded-full mt-2 ${severity.dotColor}`} />
                  <div className="min-w-0">
                    <p className="text-sm text-foreground font-medium mb-1">
                      {log.attackType} payload detected and sanitized
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span
                        className={`px-1.5 py-0.5 rounded ${severity.color} bg-current/10`}
                      >
                        {log.attackType}
                      </span>
                      <span>Source: {log.sourceIp}</span>
                      <span>Target: {log.targetEndpoint}</span>
                      <span>{formatTimestamp(log.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded text-xs font-mono font-bold ${remediation.color} ${remediation.bgColor}`}
                >
                  <ShieldCheck className="h-3 w-3" />
                  {remediation.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
