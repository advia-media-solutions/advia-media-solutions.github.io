import React from 'react';
import { Clock, Lightbulb, BarChart3 } from 'lucide-react';
import GlassCard from './GlassCard';

const MarketingBlock = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Perfect Timing Simulation",
      description: "AI-powered algorithms analyze user behavior patterns to identify the optimal moments for engagement.",
      metrics: [
        "98% timing accuracy",
        "2.5x engagement increase",
        "Reduced ad fatigue"
      ]
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Creative Adaptation",
      description: "Dynamic content optimization that adapts to user context and intent in real-time.",
      metrics: [
        "Auto-personalization",
        "Context-aware messaging",
        "Real-time optimization"
      ]
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Metrics",
      description: "Comprehensive analytics focused on engagement quality and user attention metrics.",
      metrics: [
        "45% attention increase",
        "3x conversion rate",
        "Improved ROI"
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-corporate-dark mb-6">
            Smart Marketing{' '}
            <span className="bg-gradient-to-r from-corporate-coral to-corporate-orange bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-xl text-corporate-gray/80 max-w-2xl mx-auto">
            Transform your marketing strategy with AI-powered timing, creative adaptation, and precise performance tracking.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              className="p-8 hover:translate-y-[-4px]"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-corporate-orange/10 flex items-center justify-center text-corporate-orange mb-6">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-corporate-dark mb-4">
                {feature.title}
              </h3>
              <p className="text-corporate-gray/80 mb-6">
                {feature.description}
              </p>

              {/* Metrics */}
              <div className="space-y-3">
                {feature.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-corporate-orange" />
                    <span className="text-corporate-dark">{metric}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-corporate-orange/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-corporate-coral/10 rounded-full blur-2xl animate-float-medium" />
      </div>
    </section>
  );
};

export default MarketingBlock;