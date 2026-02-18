"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Cpu, 
  AlertTriangle, 
  Terminal,
  Scan,
  CheckCircle2
} from "lucide-react";
import { Label as RadixLabel } from "@radix-ui/react-label";

const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props}>{children}</button>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;

const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label {...props}>{children}</label>
);

/**
 * Login Page - AEGIS Defense Grid Authentication
 * Redesigned with Cyber-Industrial/Tactical Aesthetic
 */
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    operatorId: "",
    passphrase: "",
  });

  // Animation trigger on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to dashboard (mock authentication)
    router.push("/dashboard");
  };

  const handleSocialAuth = (_provider: string) => {
    // In a real app, this would redirect to OAuth flow
  };

  return (
    <div className="min-h-screen bg-[#020408] text-gray-100 font-mono selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden relative flex items-center justify-center">
      
      {/* --- GLOBAL EFFECTS --- */}
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[100] bg-[length:100%_2px,3px_100%] opacity-20"></div>
      
      {/* Hex Grid Background */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      {/* Ambient Glows */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-cyan-500/10 blur-[120px] pointer-events-none -z-10"></div>

      {/* --- LOGIN PANEL --- */}
      <div className={`relative w-full max-w-md p-4 transition-all duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
        {/* Decorative corner markers */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50 transition-all duration-500 group-hover:w-8 group-hover:h-8"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-500/50 transition-all duration-500 group-hover:w-8 group-hover:h-8"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-500/50 transition-all duration-500 group-hover:w-8 group-hover:h-8"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50 transition-all duration-500 group-hover:w-8 group-hover:h-8"></div>

        <div className="relative bg-[#0a0c10]/90 backdrop-blur-xl border border-white/10 p-8 rounded-sm shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-8 space-y-2 relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 group hover:opacity-80 transition-opacity">
              <Shield className="h-8 w-8 text-cyan-500" />
              <span className="font-bold text-xl tracking-widest text-white">AEGIS<span className="text-cyan-500">_GRID</span></span>
            </Link>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <Lock className="w-3 h-3 text-red-400" /> Restricted Access Area
            </h2>
          </div>

          {/* System Status Banner */}
          <div className="mb-6 bg-black/40 border border-white/5 p-3 rounded-sm text-xs flex items-center justify-between">
            <span className="text-gray-500 uppercase tracking-wider">Auth_Protocol</span>
            <span className="text-emerald-500 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Active
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* Operator ID */}
            <div className="space-y-1.5">
              <Label htmlFor="operatorId" className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold ml-1 flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Operator_ID
              </Label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur"></div>
                <div className="relative">
                  <Input
                    id="operatorId"
                    name="operatorId"
                    type="email"
                    placeholder="ENTER_IDENTITY_TOKEN"
                    value={formData.operatorId}
                    onChange={handleInputChange}
                    required
                    className="pl-4 bg-[#05070a] border-white/10 text-gray-300 placeholder:text-gray-700 font-mono text-xs h-11 focus:ring-0 focus:border-cyan-500/50 rounded-sm transition-all w-full"
                  />
                </div>
              </div>
            </div>

            {/* Passphrase */}
            <div className="space-y-1.5">
              <Label htmlFor="passphrase" className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold ml-1 flex items-center gap-2">
                <Scan className="w-3 h-3" /> Secure_Passphrase
              </Label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur"></div>
                <div className="relative">
                  <Input
                    id="passphrase"
                    name="passphrase"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={formData.passphrase}
                    onChange={handleInputChange}
                    required
                    className="pl-4 pr-10 bg-[#05070a] border-white/10 text-gray-300 placeholder:text-gray-700 font-mono text-xs h-11 focus:ring-0 focus:border-cyan-500/50 rounded-sm transition-all w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-900/20 hover:bg-cyan-900/40 text-cyan-400 border border-cyan-500/50 hover:border-cyan-400 h-12 uppercase tracking-widest font-bold text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] mt-4 relative overflow-hidden group rounded-sm"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 animate-spin" /> VERIFYING_HASH...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  INITIATE_UPLINK <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full group-hover:animate-ping"></div>
                </span>
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 flex items-center justify-between text-[10px] text-gray-600 uppercase tracking-wider border-t border-white/5 pt-4">
            <div className="flex gap-4">
              <button className="hover:text-cyan-400 transition-colors" onClick={() => handleSocialAuth("github")}>[ GitHub ]</button>
              <button className="hover:text-cyan-400 transition-colors" onClick={() => handleSocialAuth("google")}>[ Google ]</button>
            </div>
            <Link href="/" className="hover:text-red-400 transition-colors">
              ABORT
            </Link>
          </div>

        </div>
        
        {/* Security Warning */}
        <div className="mt-6 text-center animate-pulse">
           <p className="text-[10px] text-red-500/70 font-mono uppercase tracking-widest">
             <AlertTriangle className="w-3 h-3 inline mr-1 mb-0.5" /> 
             UNAUTHORIZED ATTEMPTS WILL BE LOGGED
           </p>
        </div>
      </div>
    </div>
  );
}