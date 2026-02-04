"use client";

import Link from "next/link";
import { Shield, LogOut, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * DashboardHeader - Top navigation for the dashboard
 */
export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-[#020617]/90 backdrop-blur-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="h-7 w-7 text-primary transition-all group-hover:text-primary/80" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-tight text-foreground">
                AEGIS
              </span>
              <span className="font-mono text-[10px] text-muted-foreground hidden sm:block">
                Defense Grid
              </span>
            </div>
          </Link>

          {/* Center - Status */}
          <div className="hidden md:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-mono text-primary">
              SYSTEMS ONLINE
            </span>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-mono text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hidden sm:flex"
            >
              <Settings className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border/50">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-mono text-foreground">
                  Operator-01
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  Admin
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>

            {/* Logout */}
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
