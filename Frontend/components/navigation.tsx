"use client";

import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Navigation - Top navigation bar for AEGIS Defense Grid
 * Features the logo, nav links, and authentication button
 */
export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-[#020617]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary transition-all group-hover:text-primary/80" />
              <div className="absolute inset-0 h-8 w-8 animate-ping opacity-20 text-primary">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <span className="font-mono text-lg font-bold tracking-tight text-foreground">
              AEGIS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono">
                Access Console
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/login"
                className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono">
                  Access Console
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
