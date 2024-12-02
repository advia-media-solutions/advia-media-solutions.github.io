// src/pages/WebSimulation.jsx
import React from "react";
import {
  ArrowRight,
  Globe,
  Target,
  Brain,
  Activity,
  Users,
  BarChart,
} from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";

const WebSimulation = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze and predict user behavior patterns across the web.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Precision Targeting",
      description:
        "Identify and reach your ideal audience with pinpoint accuracy based on real behavioral data.",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-time Insights",
      description:
        "Monitor and analyze user behavior as it happens, enabling immediate response to trends.",
    },
  ];

  // src/pages/WebSimulation.jsx (continued)
  const benefits = [
    {
      title: "Higher Conversion Rates",
      description:
        "Understand user intent and behavior to optimize conversion paths",
      stats: "45% increase",
      icon: <BarChart className="w-6 h-6" />,
    },
    {
      title: "Better User Understanding",
      description: "Deep insights into how users navigate and make decisions",
      stats: "360° view",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Global Coverage",
      description: "Track and analyze user behavior across the entire open web",
      stats: "Worldwide",
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-corporate-coral/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-corporate-orange/10 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-corporate-orange/10 rounded-full blur-2xl animate-float-fast" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-corporate-dark mb-6 mt-10">
            User Simulation on{" "}
            <span className="bg-gradient-to-r from-corporate-coral via-corporate-orange to-corporate-orange bg-clip-text text-transparent animate-gradient">
              Open Web
            </span>
          </h1>
          <p className="text-xl text-corporate-gray/80 max-w-2xl mx-auto mb-8">
            Understand and predict user behavior across the open web using our
            advanced AI-powered simulation technology.
          </p>
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Start Free Trial
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <GlassCard key={index} className="p-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-corporate-orange/10 flex items-center justify-center text-corporate-orange">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-corporate-dark">
                  {feature.title}
                </h3>
                <p className="text-corporate-gray/80">{feature.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-dark mb-4">
              Key Benefits
            </h2>
            <p className="text-xl text-corporate-gray/80 max-w-2xl mx-auto">
              Transform your understanding of user behavior and optimize your
              digital presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <GlassCard key={index} className="p-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-corporate-orange/10 flex items-center justify-center text-corporate-orange">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-corporate-gray/80 mb-3">
                      {benefit.description}
                    </p>
                    <div className="text-lg font-semibold text-corporate-orange">
                      {benefit.stats}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <GlassCard className="p-12 text-center">
          <h2 className="text-3xl font-bold text-corporate-dark mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-corporate-gray/80 max-w-2xl mx-auto mb-8">
            Join leading brands using our AI-powered user simulation platform to
            optimize their digital presence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Start Free Trial
            </Button>
            <Button size="lg" to="/contact">
              Contact Sales
            </Button>
          </div>
        </GlassCard>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default WebSimulation;
