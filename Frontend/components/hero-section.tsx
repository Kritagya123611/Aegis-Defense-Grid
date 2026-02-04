"use client";

import Link from "next/link";
import { Shield, Activity, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * HeroSection - Landing page hero with cybersecurity-inspired design
 * Features animated grid background and glowing elements
 */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 scanline opacity-50" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-mono text-primary uppercase tracking-wider">
            Defense Systems Active
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-foreground">AEGIS</span>
          <br />
          <span className="text-primary text-glow-green">Defense Grid</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground font-mono max-w-2xl mx-auto mb-8">
          Self-Healing Polymorphic Cyber Defense Platform
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Real-time threat detection, automated remediation, and adaptive
          defense mechanisms powered by advanced AI algorithms.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono glow-green px-8"
            >
              <Shield className="mr-2 h-5 w-5" />
              Access Console
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-primary hover:text-primary font-mono px-8 bg-transparent"
            >
              <Lock className="mr-2 h-5 w-5" />
              Authenticate
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
          <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-colors group">
            <Activity className="h-8 w-8 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="font-mono text-sm font-semibold text-foreground mb-2">
              Real-time Monitoring
            </h3>
            <p className="text-xs text-muted-foreground">
              24/7 threat surveillance across all network endpoints
            </p>
          </div>

          <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-colors group">
            <Zap className="h-8 w-8 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="font-mono text-sm font-semibold text-foreground mb-2">
              Auto-Remediation
            </h3>
            <p className="text-xs text-muted-foreground">
              Instant response to detected threats with self-healing protocols
            </p>
          </div>

          <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-colors group">
            <Shield className="h-8 w-8 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="font-mono text-sm font-semibold text-foreground mb-2">
              Adaptive Defense
            </h3>
            <p className="text-xs text-muted-foreground">
              Polymorphic algorithms that evolve with emerging threats
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
}
