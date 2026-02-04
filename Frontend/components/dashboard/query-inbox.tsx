"use client";

import React from "react"

import { useState, useRef, useEffect } from "react";
import { Send, Terminal, AlertTriangle, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * QueryInbox - SQL injection testing terminal
 * Allows users to input payloads and see how the system detects/blocks them
 */

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

// Common SQL injection patterns for detection
const SQL_INJECTION_PATTERNS = [
  { pattern: /('|")\s*(OR|AND)\s*('|")?1\s*=\s*1/i, type: "SQL Injection (Boolean)", confidence: 98 },
  { pattern: /UNION\s+(ALL\s+)?SELECT/i, type: "SQL Injection (UNION)", confidence: 97 },
  { pattern: /;\s*(DROP|DELETE|TRUNCATE|ALTER)\s+/i, type: "SQL Injection (Destructive)", confidence: 99 },
  { pattern: /--\s*$/m, type: "SQL Comment Injection", confidence: 85 },
  { pattern: /\/\*.*\*\//s, type: "SQL Block Comment", confidence: 80 },
  { pattern: /EXEC(\s+|\()/i, type: "SQL Injection (EXEC)", confidence: 95 },
  { pattern: /xp_cmdshell/i, type: "SQL Injection (Command Shell)", confidence: 99 },
  { pattern: /SLEEP\s*\(/i, type: "SQL Injection (Time-Based)", confidence: 92 },
  { pattern: /BENCHMARK\s*\(/i, type: "SQL Injection (Benchmark)", confidence: 90 },
  { pattern: /WAITFOR\s+DELAY/i, type: "SQL Injection (Time-Based)", confidence: 94 },
  { pattern: /<script[^>]*>/i, type: "XSS Attack", confidence: 96 },
  { pattern: /javascript:/i, type: "XSS Attack (Protocol)", confidence: 88 },
  { pattern: /on(error|load|click|mouseover)\s*=/i, type: "XSS Attack (Event Handler)", confidence: 91 },
  { pattern: /\.\.\//g, type: "Path Traversal", confidence: 85 },
  { pattern: /;.*\|/i, type: "Command Injection", confidence: 93 },
  { pattern: /\$\{.*\}/i, type: "Template Injection", confidence: 87 },
  { pattern: /{{.*}}/i, type: "SSTI Attack", confidence: 89 },
];

function analyzeQuery(query: string): Omit<AnalysisResult, "id" | "timestamp" | "query"> {
  const trimmedQuery = query.trim();
  
  if (!trimmedQuery) {
    return {
      isThreat: false,
      threatType: null,
      confidence: 0,
      details: "Empty input received",
      remediation: "No action required",
    };
  }

  // Check each pattern
  for (const { pattern, type, confidence } of SQL_INJECTION_PATTERNS) {
    if (pattern.test(trimmedQuery)) {
      return {
        isThreat: true,
        threatType: type,
        confidence,
        details: `Malicious pattern detected: ${pattern.toString().slice(1, 40)}...`,
        remediation: "Payload blocked and sanitized. Source IP flagged for monitoring.",
      };
    }
  }

  // Check for suspicious keywords
  const suspiciousKeywords = ["SELECT", "INSERT", "UPDATE", "DELETE", "DROP", "CREATE", "ALTER"];
  const hasKeyword = suspiciousKeywords.some((kw) => trimmedQuery.toUpperCase().includes(kw));
  
  if (hasKeyword) {
    return {
      isThreat: false,
      threatType: null,
      confidence: 30,
      details: "SQL keywords detected but no malicious pattern found",
      remediation: "Query logged for audit. Passed to backend for parameterized execution.",
    };
  }

  return {
    isThreat: false,
    threatType: null,
    confidence: 5,
    details: "Input appears safe. No known attack patterns detected.",
    remediation: "Query passed validation. Proceeding with standard execution flow.",
  };
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
    
    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const analysis = analyzeQuery(query);
    const result: AnalysisResult = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      query,
      ...analysis,
    };

    setResults((prev) => [...prev, result]);
    setQuery("");
    setIsAnalyzing(false);
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
    "1; DROP TABLE users--",
    "UNION SELECT * FROM passwords",
    "<script>alert('xss')</script>",
    "../../../etc/passwd",
    "admin'; EXEC xp_cmdshell('dir')--",
  ];

  return (
    <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          <h2 className="font-mono text-sm font-semibold text-foreground">
            Payload Analysis Terminal
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
          <div className="h-full flex items-center justify-center text-muted-foreground font-mono text-sm">
            Enter a payload to analyze...
          </div>
        ) : (
          results.map((result) => (
            <div
              key={result.id}
              className={`rounded-lg border p-4 ${
                result.isThreat
                  ? "border-red-500/30 bg-red-500/5"
                  : "border-emerald-500/30 bg-emerald-500/5"
              }`}
            >
              {/* Query Input */}
              <div className="mb-3">
                <span className="text-xs text-muted-foreground font-mono">INPUT:</span>
                <code className="block mt-1 p-2 rounded bg-black/30 text-sm font-mono text-foreground break-all">
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
                      {result.isThreat ? "THREAT DETECTED" : "SAFE"}
                    </span>
                    {result.threatType && (
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-mono">
                        {result.threatType}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground font-mono ml-auto">
                      Confidence: {result.confidence}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mb-2">
                    {result.details}
                  </p>
                  <p className="text-xs font-mono">
                    <span className="text-yellow-500">Remediation:</span>{" "}
                    <span className="text-muted-foreground">{result.remediation}</span>
                  </p>
                </div>
              </div>

              <div className="mt-2 text-xs text-muted-foreground/60 font-mono text-right">
                {result.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        <div ref={resultsEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50 bg-secondary/20">
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
              placeholder="Enter SQL query or payload to analyze..."
              className="w-full pl-8 pr-4 py-3 rounded-lg bg-input border border-border/50 text-foreground font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              disabled={isAnalyzing}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!query.trim() || isAnalyzing}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono px-6"
          >
            {isAnalyzing ? (
              <span className="animate-pulse">Analyzing...</span>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Analyze
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
