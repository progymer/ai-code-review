import { Hero } from "@/components/landing/hero";
import FeaturesSection from "@/components/landing/features";
import { ScrollySteps } from "@/components/landing/steps";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <FeaturesSection />
      <ScrollySteps />
    </main>
  );
}
