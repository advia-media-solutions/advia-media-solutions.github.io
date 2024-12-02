import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  Globe,
  Trophy,
} from "lucide-react";
import Button from "./Button";
import GlassCard from "./GlassCard";

const HeroSection = () => {
  const features = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Open Web Media Activation",
      description: "Connect with your audience across the active web",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "User Behavior Simulation",
      description: "Predict and understand customer journeys",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Brand Connection Insights",
      description: "Discover meaningful touchpoints",
    },
  ];

  return (
    <section className="relative min-h-screen pt-20 flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-corporate-orange/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-corporate-coral/10 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-corporate-teal/10 rounded-full blur-2xl animate-float-fast" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-corporate-cream/50 backdrop-blur-sm border border-white/20 text-sm text-corporate-dark/80">
              <Sparkles className="w-4 h-4 text-corporate-orange" />
              <span>AI-Powered Customer Understanding</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-corporate-dark tracking-tight">
                Think like your{" "}
                <span className="inline-block">
                  <span className="bg-gradient-to-r from-corporate-coral via-corporate-orange to-corporate-orange bg-clip-text text-transparent animate-gradient">
                    customer
                  </span>
                </span>
              </h1>

              <p className="text-xl text-corporate-gray/80 leading-relaxed max-w-xl">
                Discover how your customers navigate the web. Our AI-powered
                platform simulates user behavior to predict and optimize their
                journey to your brand.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                to="/about"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                className="relative z-10"
              >
                Get Started
              </Button>
              <Button
                to="/contact"
                size="lg"
                className="relative z-10"
                icon={<ArrowUpRight className="w-5 h-5" />}
              >
                Schedule Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-corporate-dark/10">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                {/* Stats */}
                <div className="flex gap-8">
                  <div>
                    <div className="text-2xl font-bold text-corporate-dark">
                      200+
                    </div>
                    <div className="text-sm text-corporate-gray/80">
                      Global Brands
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-corporate-dark">
                      95%
                    </div>
                    <div className="text-sm text-corporate-gray/80">
                      Success Rate
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-12 bg-corporate-dark/10" />

                {/* Awards/Recognition */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-corporate-orange/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-corporate-orange" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-corporate-dark">
                      Award Winner
                    </div>
                    <div className="text-sm text-corporate-gray/80">
                      Best AI Innovation 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <GlassCard variant="feature" className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">
                    Platform Features
                  </h3>
                  <p className="text-corporate-gray/80">
                    Everything you need to understand and reach your customers
                  </p>
                </div>

                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-corporate-orange/10 flex items-center justify-center text-corporate-orange group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-corporate-dark group-hover:text-corporate-orange transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-corporate-gray/80">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Feature Highlights */}
                <div className="pt-6 border-t border-corporate-dark/10">
                  <ul className="space-y-3">
                    {[
                      "Real-time behavior analysis",
                      "Custom audience targeting",
                      "Advanced analytics dashboard",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm text-corporate-gray/80"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-corporate-orange" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>

            {/* Decorative elements */}
            <div className="absolute -z-10 inset-0 translate-x-4 translate-y-4">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-corporate-orange/20 to-corporate-coral/20 blur-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
