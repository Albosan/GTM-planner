import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Brain } from "lucide-react";
import { useState } from "react";

export const BusinessProfileForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    businessModel: "",
    challenge: "",
    goal: "",
    budget: "",
    marketDescription: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - this would integrate with the AI backend
    console.log("Business profile submitted:", formData);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tell Us About Your
            <span className="block gradient-primary bg-clip-text text-transparent">
              Business Challenge
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Our AI will analyze your information to create a personalized go-to-market strategy
          </p>
        </div>

        <Card className="shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              Business Profile Setup
            </CardTitle>
            <CardDescription>
              Provide key details about your business to generate targeted strategies
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Your company name"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, businessModel: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2b">B2B</SelectItem>
                      <SelectItem value="b2c">B2C</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="freemium">Freemium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget">Available Budget</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<10k">Less than $10k</SelectItem>
                      <SelectItem value="10k-50k">$10k - $50k</SelectItem>
                      <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                      <SelectItem value="100k-500k">$100k - $500k</SelectItem>
                      <SelectItem value="500k+">$500k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="challenge">Main Business Challenge</Label>
                <Textarea
                  id="challenge"
                  placeholder="Describe the main challenge you're facing (e.g., low customer acquisition, market penetration, competitive positioning)"
                  value={formData.challenge}
                  onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">Primary Goal</Label>
                <Textarea
                  id="goal"
                  placeholder="What do you want to achieve? (e.g., increase revenue by 30%, launch new product, enter new market)"
                  value={formData.goal}
                  onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="marketDescription">Market & Competition</Label>
                <Textarea
                  id="marketDescription"
                  placeholder="Describe your target market and key competitors"
                  value={formData.marketDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, marketDescription: e.target.value }))}
                  rows={3}
                />
              </div>
              
              {/* Data Upload Section */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Data (Optional)</h3>
                <p className="text-muted-foreground mb-4">
                  Upload GA4 exports, financial reports, or other relevant business data for more accurate analysis
                </p>
                <Button variant="outline">
                  Choose Files
                </Button>
              </div>
              
              <div className="flex gap-4 pt-6">
                <Button type="submit" variant="hero" size="lg" className="flex-1">
                  Generate GTM Strategy
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Save Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};