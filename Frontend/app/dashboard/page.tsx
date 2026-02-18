"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  Activity, 
  Server, 
  ArrowLeft,
  Cpu, 
  AlertTriangle,
  Lock,
  Wifi
} from "lucide-react";
import { QueryInbox, type ThreatLog } from "@/components/dashboard/query-inbox";
import { getMockServers } from "@/lib/api";

export default function DashboardPage() {
  // Local state to store logs since backend doesn't save history yet
  const [logs, setLogs] = useState<ThreatLog[]>([]);
  const servers = getMockServers();

  // Callback when QueryInbox receives a response
  const handleNewLog = (log: ThreatLog) => {
    setLogs((prev) => [log, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-gray-100 font-mono selection:bg-cyan-500/30 p-6">
      
      {/* --- HEADER --- */}
      <header className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Shield className="w-8 h-8 text-cyan-500" />
            <h1 className="text-2xl font-bold tracking-widest text-white">
              AEGIS<span className="text-cyan-500">_COMMAND</span>
            </h1>
          </div>
          <div className="flex gap-4 text-[10px] text-gray-500 uppercase tracking-wider">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Sys_Online</span>
            <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> Net_Active</span>
          </div>
        </div>
        <Link href="/">
          <button className="px-4 py-2 border border-white/10 hover:bg-white/5 text-xs uppercase tracking-widest text-gray-400 transition-all flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Logout
          </button>
        </Link>
      </header>

      <div className="grid lg:grid-cols-3 gap-6 h-[700px]">
        
        {/* --- LEFT: INFRASTRUCTURE STATUS --- */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 bg-[#0a0c10] border border-white/10 rounded-sm">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Server className="w-4 h-4" /> Node Topology
            </h2>
            <div className="space-y-3">
              {servers.map((s) => (
                <div key={s.id} className="p-3 bg-white/5 border border-white/5 rounded-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white">{s.name}</span>
                    <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">ONLINE</span>
                  </div>
                  <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full" style={{ width: `${s.load}%` }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-gray-600">
                    <span>{s.ip}</span>
                    <span>Load: {s.load}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* METRICS CARD */}
          <div className="p-4 bg-[#0a0c10] border border-white/10 rounded-sm">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Defense Metrics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-500/5 border border-red-500/20 rounded-sm">
                <div className="text-2xl font-bold text-white">{logs.filter(l => l.verdict === 'DANGER').length}</div>
                <div className="text-[10px] text-red-400 uppercase">Threats Blocked</div>
              </div>
              <div className="text-center p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-sm">
                <div className="text-2xl font-bold text-white">{logs.filter(l => l.verdict === 'SAFE').length}</div>
                <div className="text-[10px] text-emerald-400 uppercase">Safe Requests</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: LIVE FEED & TERMINAL --- */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* LOGS TABLE */}
          <div className="flex-1 bg-[#0a0c10] border border-white/10 rounded-sm overflow-hidden flex flex-col min-h-[300px]">
            <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-4 h-4" /> Live Interception Log
              </span>
              <span className="text-[10px] text-cyan-500 animate-pulse">● MONITORING</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-0 bg-black/20">
              <table className="w-full text-left">
                <thead className="text-[10px] uppercase text-gray-600 bg-white/5 font-bold">
                  <tr>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Verdict</th>
                    <th className="px-4 py-2">Payload</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-mono">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-700 italic">
                        System idle. Waiting for traffic...
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 text-gray-500">{log.timestamp.toLocaleTimeString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.verdict === 'DANGER' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {log.verdict}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-300 max-w-[200px] truncate" title={log.payload}>
                          {log.payload}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {log.destination}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* TERMINAL INPUT */}
          <div className="h-[200px] bg-[#0a0c10] border border-white/10 rounded-sm overflow-hidden">
            <QueryInbox onNewLog={handleNewLog} />
          </div>

        </div>
      </div>
    </div>
  );
}