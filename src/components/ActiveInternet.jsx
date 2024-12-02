import React from 'react';
import { Globe, Search, PlayCircle } from 'lucide-react';
import GlassCard from './GlassCard';

const ActiveInternet = () => {
  return (
    <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
      {/* Left Content */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-corporate-dark">
            Discover the{' '}
            <span className="bg-gradient-to-r from-corporate-coral to-corporate-orange bg-clip-text text-transparent">
              Active Internet
            </span>
          </h2>
          
          <p className="text-xl text-corporate-gray/80 leading-relaxed">
            The internet serves two primary purposes: entertainment and information seeking. 
            We focus on the active internet - where users actively search for answers and solutions.
          </p>
        </div>

        {/* Internet Types Visualization */}
        <div className="grid grid-cols-2 gap-6">
          <GlassCard className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-corporate-orange/10 flex items-center justify-center">
              <Search className="w-6 h-6 text-corporate-orange" />
            </div>
            <h3 className="text-xl font-semibold text-corporate-dark">Active Internet</h3>
            <p className="text-corporate-gray/80">
              Users actively searching for information, solutions, and answers to specific questions
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-corporate-gray/10 flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-corporate-gray" />
            </div>
            <h3 className="text-xl font-semibold text-corporate-dark">Passive Internet</h3>
            <p className="text-corporate-gray/80">
              Entertainment and casual browsing without specific information goals
            </p>
          </GlassCard>
        </div>

        {/* Brand Internet Example */}
        <GlassCard className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-corporate-blue/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-corporate-blue" />
            </div>
            <h3 className="text-xl font-semibold text-corporate-dark">Brand's Internet</h3>
          </div>
          
          <p className="text-corporate-gray/80">
            Within the active internet, specific areas are highly relevant for brands. 
            For example, Adidas connects with users researching running training programs.
          </p>

          <div className="bg-corporate-cream/50 rounded-xl p-4">
            <div className="text-sm font-medium text-corporate-dark/60">Example:</div>
            <div className="mt-2 text-corporate-dark">
              Running enthusiasts searching for:
              <ul className="mt-2 space-y-2">
                {[
                  'Training programs for beginners',
                  'Best running shoes for marathons',
                  'How to improve running technique',
                  'Marathon preparation tips'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-corporate-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Right Side - Only visible on desktop */}
      <div className="hidden lg:block relative">
        <div className="sticky top-24">
          <GlassCard variant="feature" className="p-8">
            <h3 className="text-2xl font-bold text-corporate-dark mb-6">
              Key Features
            </h3>
            <ul className="space-y-5">
              {[
                'Open Web Media Activation',
                'User Behavior Simulation',
                'Journey Mapping & Analytics',
                'Brand Connection Insights',
                'Predictive Customer Paths'
              ].map((feature, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-4 text-corporate-gray/80 group"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-corporate-coral to-corporate-orange group-hover:scale-150 transition-transform duration-300" />
                  <span className="group-hover:text-corporate-dark transition-colors duration-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ActiveInternet;