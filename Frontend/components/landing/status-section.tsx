"use client";

/**
 * StatusSection - System Health Monitor with live status cards
 */
export function StatusSection() {
  const statusItems = [
    {
      title: "Network Perimeter",
      description: "All endpoints secured",
      status: "SECURE",
      statusColor: "bg-emerald-500 text-emerald-950",
      dotColor: "bg-emerald-500",
    },
    {
      title: "Firewall Rules",
      description: "2,847 active rules",
      status: "ACTIVE",
      statusColor: "bg-emerald-500 text-emerald-950",
      dotColor: "bg-emerald-500",
    },
    {
      title: "Threat Analysis",
      description: "Processing 3 events",
      status: "ANALYZING",
      statusColor: "bg-yellow-500 text-yellow-950",
      dotColor: "bg-yellow-500",
    },
    {
      title: "Auto-Remediation",
      description: "Ready to deploy",
      status: "STANDBY",
      statusColor: "bg-emerald-500 text-emerald-950",
      dotColor: "bg-emerald-500",
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#020617]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-6">
            Live Status
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            System Health Monitor
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusItems.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border/50 bg-card/30 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.dotColor}`} />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${item.statusColor}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
