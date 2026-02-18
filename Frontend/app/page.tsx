"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Shield, 
  Cpu, 
  Terminal, 
  Activity, 
  ArrowRight, 
  AlertTriangle,
  Server,
  Zap,
  Eye,
  Globe,
  Code2,
  Network,
  Lock,
  Wifi
} from "lucide-react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020408] text-gray-100 font-mono selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      
      {/* --- GLOBAL EFFECTS --- */}
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[100] bg-[length:100%_2px,3px_100%] opacity-20"></div>
      
      {/* Hex Grid Background */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      {/* Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-cyan-500/10 blur-[120px] pointer-events-none -z-10"></div>

      {/* --- HUD STATUS BAR (TOP) --- */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-[#020408]/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto h-14 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Shield className="w-5 h-5" />
              <span className="text-lg font-bold tracking-widest text-white">AEGIS<span className="text-cyan-500">_GRID</span></span>
            </div>
            <div className="hidden md:flex items-center gap-4 px-4 border-l border-white/10 text-[10px] text-gray-500 uppercase tracking-widest">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Sys_Online</span>
              <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> Latency: 12ms</span>
              <span className="flex items-center gap-1">Ver: 2.4.0-RC</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-xs tracking-widest text-gray-400">
              <a href="#architecture" className="hover:text-cyan-400 transition-colors uppercase">[Topology]</a>
              <a href="#capabilities" className="hover:text-cyan-400 transition-colors uppercase">[Modules]</a>
              <a href="#intel" className="hover:text-cyan-400 transition-colors uppercase">[Intelligence]</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="text-xs uppercase hover:text-white text-gray-400 transition-colors px-3 py-1">Login</button>
              </Link>
              <Link href="/dashboard">
                <button className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 px-4 py-1.5 text-xs uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2 group">
                  <Terminal className="w-3 h-3" />
                  <span>Launch_Console</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border-l-2 border-red-500 text-red-400 text-[10px] uppercase tracking-[0.2em] mb-4">
              <AlertTriangle className="w-3 h-3" /> Threat Level: Critical
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-600">
              AUTONOMOUS<br/>
              CYBER<span className="text-cyan-500">_DEFENSE</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed border-l border-white/10 pl-6">
              Static firewalls are obsolete. AEGIS is a <span className="text-white font-bold">living immune system</span>. It traps attackers in a shadow realm, analyzes their payload with AI, and rewrites its own source code to patch vulnerabilities in real-time.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/login">
                <button className="h-12 px-8 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  <Zap className="w-4 h-4" /> Deploy_Grid_v2
                </button>
              </Link>
              <button className="h-12 px-8 border border-white/20 bg-transparent text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors flex items-center gap-2 group">
                <Code2 className="w-4 h-4 group-hover:text-cyan-400 transition-colors" /> View_Source
              </button>
            </div>

            {/* Metrics Ticker */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-8">
              <div>
                <div className="text-2xl font-bold text-white">0ms</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Patch Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">100%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">AI-Core</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Engine</div>
              </div>
            </div>
          </div>

          {/* Visual: The Defense Grid Interface */}
          <div className={`relative transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] -z-10 rounded-full"></div>
            
            {/* The Terminal Window */}
            <div className="relative rounded-sm border border-white/10 bg-[#0a0c10] shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">root@aegis-core:~</div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 font-mono text-xs md:text-sm space-y-2 h-[400px] overflow-hidden relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                
                <div className="text-gray-500">$ ./init_defense_protocol.sh</div>
                <div className="border-t border-dashed border-white/10 my-4"></div>
                
                <div className="text-gray-400">Listening for incoming packets...</div>
                
                <div className="pl-4 border-l-2 border-red-500/50 bg-red-500/5 p-2 mt-4 animate-pulse">
                  <div className="text-red-400 font-bold flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" /> INTRUSION ATTEMPT DETECTED
                  </div>
                  <div className="text-gray-400 mt-1">Source: 192.168.45.12</div>
                  <div className="text-gray-400">Payload: <span className="text-white">admin' OR '1'='1</span></div>
                  <div className="text-yellow-500 mt-1">{`>> REROUTING TO SHADOW REALM...`}</div>
                </div>

                <div className="pl-4 border-l-2 border-cyan-500/50 bg-cyan-500/5 p-2 mt-2">
                  <div className="text-cyan-400 font-bold flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> AI ANALYSIS INITIATED
                  </div>
                  <div className="text-gray-400 mt-1">Generating hot-patch for SQLi vector...</div>
                  <div className="text-emerald-400 mt-1">{`>> PATCH DEPLOYED to :8083`}</div>
                  <div className="text-emerald-400">{`>> TRAFFIC SWAPPED`}</div>
                </div>
                
                <div className="text-gray-500 mt-4 animate-bounce">$ _</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 border-r border-b border-cyan-500/30"></div>
            <div className="absolute -left-4 -top-4 w-24 h-24 border-l border-t border-red-500/30"></div>
          </div>
        </div>
      </section>

      {/* --- ARCHITECTURE DIAGRAM SECTION --- */}
      <section id="architecture" className="py-24 border-t border-white/5 bg-[#030508] relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,240,255,0.03),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">SYSTEM <span className="text-cyan-500">TOPOLOGY</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A distributed microservices architecture designed for zero-trust environments. The system acts as a living filter.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Connecting Lines (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-y-1/2 z-0"></div>

            {/* Node 1 */}
            <div className="relative z-10 bg-[#0a0c10] border border-white/10 p-6 rounded-sm hover:border-cyan-500/50 transition-colors group">
              <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center mb-4 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-all">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Gatekeeper Proxy</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                High-performance Go reverse proxy. Uses regex heuristics to separate clean traffic from potential threats in microseconds.
              </p>
            </div>

            {/* Node 2 */}
            <div className="relative z-10 bg-[#0a0c10] border border-white/10 p-6 rounded-sm hover:border-red-500/50 transition-colors group">
              <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center mb-4 group-hover:bg-red-500/10 group-hover:text-red-400 transition-all">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Shadow Trap</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                An isolated honeypot environment. It simulates a successful breach to keep the attacker engaged while harvesting payload data.
              </p>
            </div>

            {/* Node 3 */}
            <div className="relative z-10 bg-[#0a0c10] border border-white/10 p-6 rounded-sm hover:border-purple-500/50 transition-colors group">
              <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center mb-4 group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-all">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Neural Brain</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                The orchestration center. Connects to LLMs to analyze attack vectors and generate secure Go code patches automatically.
              </p>
            </div>

            {/* Node 4 */}
            <div className="relative z-10 bg-[#0a0c10] border border-white/10 p-6 rounded-sm hover:border-emerald-500/50 transition-colors group">
              <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Hot-Swap Deploy</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Deploys the patched container on a fresh port and seamlessly reroutes traffic. Zero downtime. Zero human intervention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CAPABILITIES GRID --- */}
      <section id="capabilities" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Feature Block 1 */}
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] uppercase tracking-widest border border-cyan-500/20">
                Active Deception
              </div>
              <h3 className="text-3xl font-bold text-white">Don't Block.<br/>Confuse & Consume.</h3>
              <p className="text-gray-400 leading-relaxed">
                Traditional WAFs tell the attacker "Access Denied", which is information. Aegis tells them "Access Granted" but sends them to a <strong>Shadow Realm</strong>. 
              </p>
              <ul className="space-y-3">
                {['Simulates DB Leaks', 'Captures Raw Payloads', 'Prevents Reconnaissance'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-1 h-1 bg-cyan-500 rounded-full"></div> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature Block 2 */}
            <div className="space-y-6 md:text-right">
              <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-widest border border-emerald-500/20">
                Self-Healing Code
              </div>
              <h3 className="text-3xl font-bold text-white">Code that rewrites<br/>itself under fire.</h3>
              <p className="text-gray-400 leading-relaxed ml-auto">
                The Neural Orchestrator doesn't just log errors. It understands them. It writes <span className="text-emerald-400 font-mono">secure.go</span> files on the fly to patch vulnerabilities before they can be exploited twice.
              </p>
              <ul className="space-y-3 flex flex-col md:items-end">
                {['Generative Patching', 'Automated Compilation', 'Blue/Green Deployment'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300 flex-row-reverse">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA / FOOTER --- */}
      <footer className="border-t border-white/10 bg-[#05070a] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <h2 className="text-2xl font-bold text-white mb-8">READY TO SECURE THE GRID?</h2>
          
          <div className="flex justify-center gap-4 mb-20">
            <Link href="/dashboard">
              <button className="h-12 px-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_30px_rgba(8,145,178,0.3)]">
                Initialize System
              </button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-xs text-gray-600 font-mono uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" />
              <span>AEGIS DEFENSE GRID v2.4</span>
            </div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-gray-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Security</a>
            </div>
            <div className="mt-4 md:mt-0">
              © 2026 CLASSIFIED
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}