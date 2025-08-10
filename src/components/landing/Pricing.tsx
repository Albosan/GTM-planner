import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Professional",
    price: "$299",
    period: "/month",
    description: "Perfect for growing businesses and startups",
    features: [
      "5 GTM strategies per month",
      "Basic market intelligence",
      "Standard AI consultation",
      "Email support",
      "Basic data integration"
    ],
    variant: "outline" as const,
    popular: false
  },
  {
    name: "Enterprise",
    price: "$799",
    period: "/month",
    description: "Advanced features for established businesses",
    features: [
      "Unlimited GTM strategies",
      "Advanced market intelligence",
      "Priority AI consultation",
      "24/7 phone & email support",
      "Full data integration (GA4, CRM)",
      "Custom strategy templates",
      "Team collaboration tools"
    ],
    variant: "hero" as const,
    popular: true
  },
  {
    name: "Elite",
    price: "$1,999",
    period: "/month",
    description: "White-glove service for enterprises",
    features: [
      "Everything in Enterprise",
      "Dedicated account manager",
      "Custom AI model training",
      "Scientific evidence reports",
      "Advanced security features",
      "API access",
      "Custom integrations"
    ],
    variant: "premium" as const,
    popular: false
  }
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your
            <span className="block gradient-primary bg-clip-text text-transparent">
              Strategic Advantage
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent pricing with no hidden fees. Start with a 14-day free trial, 
            cancel anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative shadow-card border-0 transition-smooth hover:shadow-elegant ${
                plan.popular ? 'ring-2 ring-primary/20 shadow-glow' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="gradient-accent px-4 py-2 rounded-full flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent-foreground" />
                    <span className="text-sm font-semibold text-accent-foreground">Most Popular</span>
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="flex items-baseline justify-center mt-6">
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant={plan.variant} size="lg" className="w-full">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? 
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};