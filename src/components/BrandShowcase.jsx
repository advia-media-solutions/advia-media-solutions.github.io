import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import GlassCard from './GlassCard';

const BrandShowcase = () => {
  const brands = [
    {
      name: "Disney+",
      logo: "https://storage.googleapis.com/public-web-assets-advia/brands/disney.svg",
      caseStudyUrl: "/case-studies/disney",
      description: "45% increase in qualified leads"
    },
    {
      name: "Nike",
      logo: "https://storage.googleapis.com/public-web-assets-advia/brands/nike.svg",
      caseStudyUrl: "/case-studies/innovatelabs",
      description: "2.5x ROI improvement"
    },
    {
      name: "FutureNow",
      logo: "https://storage.googleapis.com/public-web-assets-advia/brands/fintonic.png",
      caseStudyUrl: "/case-studies/futurenow",
      description: "89% customer engagement boost"
    },
    {
      name: "GlobalTech",
      logo: "https://storage.googleapis.com/public-web-assets-advia/brands/orange.png",
      caseStudyUrl: "/case-studies/globaltech",
      description: "3x conversion rate increase"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-corporate-dark mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-corporate-coral to-corporate-orange bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-corporate-gray/80 max-w-2xl mx-auto">
            See how leading brands are transforming their digital presence with our AI-powered solutions.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <GlassCard
              key={index}
              className="p-6 hover:translate-y-[-4px] group cursor-pointer"
            >
              <div className="space-y-6">
                {/* Logo Container */}
                <div className="h-20 flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-h-full w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Description */}
                <div className="text-center">
                  <p className="text-corporate-gray/80 font-medium mb-2">
                    {brand.description}
                  </p>
                </div>

                {/* Case Study Link */}
                <div className="flex justify-center">
                  <a
                    href={brand.caseStudyUrl}
                    className="inline-flex items-center gap-2 text-sm font-medium text-corporate-orange hover:text-corporate-coral transition-colors"
                  >
                    View Case Study
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
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

export default BrandShowcase;