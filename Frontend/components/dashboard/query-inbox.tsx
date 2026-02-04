"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Terminal, AlertTriangle, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisResult {
  id: string;
  timestamp: Date;
  query: string;
  isThreat: boolean;
  threatType: string | null;
  confidence: number;
  details: string;
  remediation: string;
}

export function QueryInbox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest result
  useEffect(() => {
    resultsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [results]);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setIsAnalyzing(true);

    try {
      // --- REAL BACKEND CONNECTION ---
      // This talks to your Go Proxy on Port 8080
      const response = await fetch("http://localhost:8080/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      // Map Go Backend response to Frontend Interface
      const result: AnalysisResult = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        query,
        isThreat: data.verdict === "DANGER",
        threatType: data.verdict === "DANGER" ? "SQL Injection" : null,
        confidence: 100, // It's deterministic now
        details: data.details,
        remediation: `Traffic diverted to ${data.destination}`,
      };

      setResults((prev) => [...prev, result]);
    } catch (error) {
      console.error("Failed to analyze:", error);
      // Optional: Add an error result to the UI here if needed
    } finally {
      setQuery("");
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearHistory = () => {
    setResults([]);
  };

  // Example payloads for testing
  const examplePayloads = [
    "' OR '1'='1",
    "admin' --",
    "UNION SELECT * FROM passwords",
    "Hello World",
    "SELECT * FROM users",
  ];

  return (
    <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-black/40">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          <h2 className="font-mono text-sm font-semibold text-foreground">
            Aegis Live Traffic Analysis
          </h2>
        </div>
        {results.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Example Payloads */}
      <div className="px-6 py-3 border-b border-border/30 bg-secondary/20">
        <p className="text-xs text-muted-foreground mb-2 font-mono">Quick test payloads:</p>
        <div className="flex flex-wrap gap-2">
          {examplePayloads.map((payload) => (
            <button
              type="button"
              key={payload}
              onClick={() => setQuery(payload)}
              className="px-2 py-1 text-xs font-mono bg-secondary/50 text-muted-foreground rounded border border-border/30 hover:border-primary/50 hover:text-primary transition-colors truncate max-w-[200px]"
              title={payload}
            >
              {payload}
            </button>
          ))}
        </div>
      </div>

      {/* Results Display */}
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#0a0f1a]">
        {results.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground font-mono text-sm gap-2 opacity-50">
            <ShieldCheck className="w-12 h-12 mb-2" />
            <span>Awaiting Traffic...</span>
            <span className="text-xs">Connected to Proxy :8080</span>
          </div>
        ) : (
          results.map((result) => (
            <div
              key={result.id}
              className={`rounded-lg border p-4 transition-all duration-300 ${
                result.isThreat
                  ? "border-red-500/30 bg-red-950/20"
                  : "border-emerald-500/30 bg-emerald-950/20"
              }`}
            >
              {/* Query Input */}
              <div className="mb-3">
                <span className="text-xs text-muted-foreground font-mono">PAYLOAD:</span>
                <code className="block mt-1 p-2 rounded bg-black/50 text-sm font-mono text-foreground break-all border border-white/5">
                  {result.query}
                </code>
              </div>

              {/* Analysis Result */}
              <div className="flex items-start gap-3">
                {result.isThreat ? (
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-sm font-mono font-bold ${
                        result.isThreat ? "text-red-500" : "text-emerald-500"
                      }`}
                    >
                      {result.isThreat ? "THREAT DETECTED" : "SAFE TRAFFIC"}
                    </span>
                    {result.threatType && (
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-mono border border-red-500/20">
                        {result.threatType}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mb-2">
                    {result.details}
                  </p>
                  <p className="text-xs font-mono">
                    <span className="text-primary/70">Action Taken:</span>{" "}
                    <span className="text-foreground">{result.remediation}</span>
                  </p>
                </div>
              </div>

              <div className="mt-2 text-xs text-muted-foreground/40 font-mono text-right">
                {result.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        <div ref={resultsEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50 bg-secondary/10">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono text-sm">
              $
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Inject payload..."
              className="w-full pl-8 pr-4 py-3 rounded-lg bg-background/50 border border-border/50 text-foreground font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
              disabled={isAnalyzing}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!query.trim() || isAnalyzing}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono px-6 shadow-lg shadow-primary/20"
          >
            {isAnalyzing ? (
              <span className="animate-pulse">Scanning...</span>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}