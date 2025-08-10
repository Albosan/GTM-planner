import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Target } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-primary opacity-95 z-10" />
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            AI-Powered
            <span className="block gradient-accent bg-clip-text text-transparent">
              Go-to-Market
            </span>
            Strategy Generator
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Generate data-driven GTM strategies with advanced AI insights, market intelligence, 
            and scientific evidence. Trusted by enterprises worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Start Free Trial
              <ArrowRight className="ml-2" />
            </Button>
            <Button variant="enterprise" size="lg" className="text-lg px-8 py-4">
              Book Demo
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Strategic Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};