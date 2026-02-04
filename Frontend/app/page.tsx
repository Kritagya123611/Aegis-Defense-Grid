import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ArchitectureSection } from "@/components/landing/architecture-section";
import { StatusSection } from "@/components/landing/status-section";
import { TerminalSection } from "@/components/landing/terminal-section";
import { Footer } from "@/components/landing/footer";

/**
 * Landing Page - AEGIS Defense Grid
 * Dark cybersecurity-inspired landing page with multiple sections
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ArchitectureSection />
      <TerminalSection />
      <StatusSection />
      <Footer />
    </main>
  );
}
