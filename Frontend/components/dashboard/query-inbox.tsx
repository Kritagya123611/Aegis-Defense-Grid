"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Terminal, ShieldAlert, ShieldCheck } from "lucide-react";
import { analyzePayload } from "@/lib/api";

// Define the shape of a Log Entry for the UI
export interface ThreatLog {
  id: string;
  timestamp: Date;
  payload: string;
  verdict: "SAFE" | "DANGER";
  destination: string;
  details: string;
}

interface QueryInboxProps {
  onNewLog: (log: ThreatLog) => void; // Callback to update the parent dashboard
}

export function QueryInbox({ onNewLog }: QueryInboxProps) {
  const [query, setQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!query.trim()) return;
    setIsScanning(true);

    // 1. Call Real Backend
    const result = await analyzePayload(query);

    setIsScanning(false);

    if (result) {
      // 2. Create a Log Entry from the backend response
      const newLog: ThreatLog = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        payload: query,
        verdict: result.verdict as "SAFE" | "DANGER",
        destination: result.destination,
        details: result.details,
      };

      // 3. Send it to the Dashboard to display
      onNewLog(newLog);
      setQuery(""); // Clear input
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleScan();
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0c10]">
      {/* Header */}
      <div className="px-4 py-2 border-b border-white/10 flex items-center gap-2 bg-white/5">
        <Terminal className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">
          Live_Injection_Terminal
        </span>
      </div>

      {/* Input Area */}
      <div className="flex-1 p-4 flex flex-col justify-center">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded opacity-50 blur group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center bg-black border border-white/10 rounded overflow-hidden">
            <span className="pl-4 text-cyan-500 font-mono">$</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter SQL payload (e.g. admin' OR '1'='1)..."
              disabled={isScanning}
              className="w-full bg-transparent border-none text-white font-mono text-sm px-4 py-3 focus:ring-0 placeholder:text-gray-700"
            />
            <button
              onClick={handleScan}
              disabled={isScanning || !query}
              className="px-6 py-3 bg-white/5 hover:bg-cyan-500/20 border-l border-white/10 text-cyan-400 hover:text-cyan-200 transition-all font-mono text-xs uppercase tracking-wider flex items-center gap-2"
            >
              {isScanning ? (
                <span className="animate-pulse">Scanning...</span>
              ) : (
                <>
                  <Send className="w-3 h-3" /> Execute
                </>
              )}
            </button>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-gray-600 font-mono text-center">
          CONNECTED TO: localhost:8080 via Secure Proxy
        </p>
      </div>
    </div>
  );
}