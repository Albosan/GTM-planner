import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { BusinessProfileForm } from "@/components/forms/BusinessProfileForm";
import { Pricing } from "@/components/landing/Pricing";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="features">
          <Features />
        </section>
        <BusinessProfileForm />
        <section id="pricing">
          <Pricing />
        </section>
      </main>
    </div>
  );
};

export default Index;