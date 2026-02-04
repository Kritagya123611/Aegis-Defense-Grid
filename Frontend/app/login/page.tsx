"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Login Page - AEGIS Defense Grid Authentication
 * Dark cybersecurity-inspired login with operator credentials
 */
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    operatorId: "",
    passphrase: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (UI only - no real auth)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to dashboard (mock authentication)
    router.push("/dashboard");
  };

  // Placeholder for social auth (UI only)
  const handleSocialAuth = (_provider: string) => {
    // In a real app, this would redirect to OAuth flow
  };

  return (
    <main className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08)_0%,transparent_60%)]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="rounded-lg border border-border/50 bg-card/90 backdrop-blur-md p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="relative">
                <Shield className="h-10 w-10 text-primary transition-all group-hover:text-primary/80" />
                <div className="absolute inset-0 h-10 w-10 animate-ping opacity-20 text-primary">
                  <Shield className="h-10 w-10" />
                </div>
              </div>
              <span className="font-mono text-2xl font-bold tracking-tight text-foreground">
                AEGIS
              </span>
            </Link>
            <h1 className="text-xl font-mono font-semibold text-foreground mb-2">
              Operator Authentication
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access the defense console
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Operator ID Field */}
            <div className="space-y-2">
              <Label
                htmlFor="operatorId"
                className="text-sm font-mono text-muted-foreground"
              >
                Operator ID
              </Label>
              <Input
                id="operatorId"
                name="operatorId"
                type="email"
                placeholder="operator@aegis.defense"
                value={formData.operatorId}
                onChange={handleInputChange}
                required
                className="bg-secondary/50 border-border focus:border-primary focus:ring-primary font-mono placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Passphrase Field */}
            <div className="space-y-2">
              <Label
                htmlFor="passphrase"
                className="text-sm font-mono text-muted-foreground"
              >
                Passphrase
              </Label>
              <div className="relative">
                <Input
                  id="passphrase"
                  name="passphrase"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter secure passphrase"
                  value={formData.passphrase}
                  onChange={handleInputChange}
                  required
                  className="bg-secondary/50 border-border focus:border-primary focus:ring-primary font-mono placeholder:text-muted-foreground/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono glow-green"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                "Authenticate"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground font-mono">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialAuth("google")}
              className="border-border hover:border-primary hover:text-primary font-mono"
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialAuth("github")}
              className="border-border hover:border-primary hover:text-primary font-mono"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <p className="mt-4 text-center text-xs text-muted-foreground/60 font-mono">
          Secure connection established. All transmissions encrypted.
        </p>
      </div>
    </main>
  );
}
