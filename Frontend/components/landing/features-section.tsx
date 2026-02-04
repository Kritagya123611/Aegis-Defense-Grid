"use client";

import { Shield, Lock, Clock } from "lucide-react";

/**
 * FeaturesSection - Advanced Defense Mechanisms cards
 */
export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Threat Detection",
      description:
        "Real-time analysis of network traffic and system behavior. Machine learning models identify zero-day exploits and APT signatures.",
      tags: ["ML-Powered", "Real-time"],
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      icon: Lock,
      title: "Auto-Remediation",
      description:
        "Autonomous patch deployment and system hardening. Self-healing infrastructure recovers from attacks without human intervention.",
      tags: ["Autonomous", "Self-Healing"],
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Clock,
      title: "Polymorphic Defense",
      description:
        "Dynamic defense signatures that evolve with each attack attempt. Adversaries cannot predict or replicate defensive patterns.",
      tags: ["Adaptive", "Unpredictable"],
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#020617]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Advanced Defense Mechanisms
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Autonomous threat detection and neutralization powered by adaptive
            algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border/50 bg-card/30 p-8 hover:border-border transition-colors"
            >
              <div
                className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-6`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="flex gap-2">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
