import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Shield, Database, MessageSquare, DollarSign } from "lucide-react";
import dashboardImage from "@/assets/dashboard-preview.jpg";

const features = [
  {
    icon: Brain,
    title: "AI Market Intelligence",
    description: "Advanced algorithms analyze market trends, competitor landscapes, and industry insights to inform your strategy."
  },
  {
    icon: TrendingUp,
    title: "Strategic Planning",
    description: "Generate comprehensive GTM plans with timelines, milestones, and success metrics tailored to your business."
  },
  {
    icon: DollarSign,
    title: "Budget Optimization",
    description: "Smart budget allocation across channels with ROI predictions and cost-effectiveness analysis."
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Connect GA4, financial data, and CRM systems for personalized strategy recommendations."
  },
  {
    icon: MessageSquare,
    title: "AI Consultant Chat",
    description: "Get expert guidance and rationale behind every recommendation with our AI consulting interface."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with data encryption, compliance, and privacy protection for sensitive business data."
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need for
            <span className="block gradient-primary bg-clip-text text-transparent">
              Strategic Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform combines AI intelligence with proven business frameworks 
            to deliver actionable go-to-market strategies.
          </p>
        </div>
        
        {/* Dashboard Preview */}
        <div className="mb-16">
          <Card className="shadow-elegant border-0 overflow-hidden">
            <CardContent className="p-0">
              <img 
                src={dashboardImage} 
                alt="GTM Strategy Dashboard" 
                className="w-full h-[400px] object-cover"
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card border-0 hover:shadow-elegant transition-smooth group">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-smooth">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};