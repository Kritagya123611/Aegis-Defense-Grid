"use client";

import { useEffect, useState } from "react";

/**
 * TerminalSection - Animated terminal showing system status
 */
export function TerminalSection() {
  const [visibleLines, setVisibleLines] = useState(0);

  const terminalLines = [
    { text: "$ aegis --status", isCommand: true },
    { text: "" },
    { text: "   [✓] Negative Server: ", status: "ACTIVE", color: "text-emerald-400" },
    { text: "   [✓] Positive Server: ", status: "ACTIVE", color: "text-emerald-400" },
    { text: "   [✓] Orchestrator: ", status: "ACTIVE", color: "text-emerald-400" },
    { text: "   [✓] Threat Detection: ", status: "ONLINE", color: "text-blue-400" },
    { text: "   [✓] Auto-Remediation: ", status: "ENABLED", color: "text-emerald-400" },
    { text: "" },
    { text: "$", isPrompt: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < terminalLines.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [terminalLines.length]);

  return (
    <section className="py-24 px-4 bg-[#020617] flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Terminal Window */}
        <div className="rounded-xl border border-border/50 bg-[#0a0f1a] overflow-hidden shadow-2xl">
          {/* Title Bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-[#0d1424]">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-4">
              aegis@defense-grid ~ system_status
            </span>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm min-h-[280px]">
            {terminalLines.slice(0, visibleLines).map((line, index) => (
              <div key={index} className="leading-7">
                {line.isCommand ? (
                  <span className="text-foreground">{line.text}</span>
                ) : line.isPrompt ? (
                  <span className="text-foreground">
                    {line.text}
                    <span className="animate-pulse">_</span>
                  </span>
                ) : line.status ? (
                  <span>
                    <span className="text-foreground font-bold">{line.text}</span>
                    <span className={line.color}>{line.status}</span>
                  </span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
