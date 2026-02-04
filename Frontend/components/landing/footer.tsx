"use client";

import { Shield } from "lucide-react";

/**
 * Footer - AEGIS branding and copyright
 */
export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border/30 bg-[#020617]">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm text-muted-foreground">
            AEGIS Defense Grid
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; 2026 AEGIS Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
