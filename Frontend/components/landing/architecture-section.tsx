"use client";

import { ArrowRight } from "lucide-react";

/**
 * ArchitectureSection - Defense Grid Components diagram
 */
export function ArchitectureSection() {
  const servers = [
    {
      name: "NEGATIVE SERVER",
      title: "Threat Detection Engine",
      description: "Analyzes incoming traffic for malicious patterns",
      features: ["Traffic Analysis", "Signature Matching", "Behavioral Detection"],
      borderColor: "border-t-red-500",
      bgColor: "bg-red-500/5",
    },
    {
      name: "ORCHESTRATOR",
      title: "Central Command",
      description: "Coordinates defense responses and patch deployment",
      features: ["Decision Engine", "Patch Deployment", "State Management"],
      borderColor: "border-t-blue-500",
      bgColor: "bg-blue-500/5",
    },
    {
      name: "POSITIVE SERVER",
      title: "Stable System Core",
      description: "Maintains known-good state and recovery points",
      features: ["State Snapshots", "Integrity Verification", "Rollback Capability"],
      borderColor: "border-t-emerald-500",
      bgColor: "bg-emerald-500/5",
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#020617]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-6">
            Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Defense Grid Components
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three-tier redundant architecture for maximum resilience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {servers.map((server, index) => (
            <div key={server.name} className="flex items-center">
              <div
                className={`flex-1 rounded-xl border border-border/50 ${server.bgColor} ${server.borderColor} border-t-2 overflow-hidden`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {server.name}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {server.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {server.description}
                  </p>

                  <div className="space-y-2">
                    {server.features.map((feature) => (
                      <p
                        key={feature}
                        className="text-sm font-mono text-muted-foreground"
                      >
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {index < servers.length - 1 && (
                <div className="hidden md:flex items-center px-4">
                  <ArrowRight className="h-5 w-5 text-emerald-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
