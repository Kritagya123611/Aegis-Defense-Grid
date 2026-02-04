"use client";

import { SystemMetrics } from "@/lib/mock-data";
import { Shield, Activity, Clock, Zap } from "lucide-react";

/**
 * MetricsPanel - Displays system-wide metrics matching the dashboard screenshot
 */
interface MetricsPanelProps {
  metrics: SystemMetrics;
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  const metricItems = [
    {
      label: "Threats Blocked (24h)",
      value: metrics.threatsBlocked24h.toLocaleString(),
      icon: <Shield className="h-4 w-4" />,
    },
    {
      label: "Active Defense Rules",
      value: metrics.activeDefenseRules.toString(),
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: "System Uptime",
      value: metrics.systemUptime,
      icon: <Zap className="h-4 w-4" />,
    },
    {
      label: "Avg Response Time",
      value: metrics.avgResponseTime,
      icon: <Clock className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metricItems.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-border/50 bg-card/30 p-6"
        >
          <p className="text-3xl sm:text-4xl font-mono font-bold text-foreground mb-1">
            {item.value}
          </p>
          <p className="text-xs font-mono text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
